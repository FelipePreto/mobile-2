import { useContext, useState, useEffect } from 'react';
import { CourseContext } from '../context/CourseProvider';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { initDB, getUserData } from '../user/userStorage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import courseData from '../data/courses.json';

export default function Course({ navigation }) {
  initDB();

  useEffect(() => {
    async function fetchUserData() {
      var userData = await getUserData();
      console.log(userData);
    }
    fetchUserData();
  }, []);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    async function fetchProgress() {
      const progress = await getUserData();
      setUserProgress(progress);
    }
    fetchProgress();
  }, []);

  const { selCourse, setSelLesson } = useContext(CourseContext);
  const [loading, setLoading] = useState(true);
  const [curCourse, setCurCourse] = useState();

  function verifyLesson(lessonId) {
    return userProgress[lessonId] === true;
  }

  useEffect(() => {
    async function getCourse() {
      setCurCourse(courseData.courses.find((c) => c.id === selCourse));
    }
    getCourse();
    setLoading(false);
  }, [selCourse]);

  return (
    <View style={styles.container}>
    <View style={styles.parallelogram} />
      <View>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.navigate('Home')}>
          <FontAwesome6 name="arrow-left" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {!loading && (
        <View>
          <View>
            <Text style={styles.title}>{curCourse.name}</Text>
          </View>
          <FlatList
            style={styles.units}
            
            data={curCourse.units}
            keyExtractor={(item) => item.id}
            renderItem={({ item: unit }) => (
              <View>
                <Text>{unit.name}</Text>
                <View style={styles.unit}>
                  <FlatList
                    data={unit.lessons}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item: lesson }) => (
                      <View>
                        <TouchableOpacity
                          style={
                            verifyLesson(lesson.id)
                              ? styles.finishedLesson
                              : styles.lesson
                          }
                          onPress={() => {
                            setSelLesson(lesson);
                            navigation.navigate('Lesson');
                          }}>
                          <Text
                            style={
                              verifyLesson(lesson.id)
                                ? styles.finishedLessonText
                                : styles.lessonText
                            }>
                            {lesson.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />{' '}
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#51241F",
    height:1000, 
  },
  exitButton: {
    alignItems: 'left',
    paddingLeft: 30,
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    padding: 20,
    color:"#e0d2b7",
    bottom:10,
  },
  units: {
    fontSize:70,
    alignItems: 'center',
  },
  unit: {
    display: 'flex',
    width: 360,
    height:100,
    
    borderColor: 'brown',
    borderRadius: 25,
    backgroundColor:"#cdac81",
    marginBottom:10,
  },
  lesson: {
    padding: 5,
  },
  finishedLesson: {
    padding: 5,
    color: 'green',
  },
  lessonText: {
    color: '#340100',
    fontSize:30,
  },
  finishedLessonText: {
    color: 'green',
    fontSize:30,
  },

   parallelogram: {
    bottom: 1000,
    left:-35,
    flex:1,
    width: 480,
    height: 480,
    backgroundColor: '#340100',
  
    borderRadius:500,
    transform: [{ translateY: 200 }
    ],
    position: 'absolute', // necessário pro zIndex funcionar
   },

});
