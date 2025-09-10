import { useContext } from 'react';
import { CourseContext } from '../context/CourseProvider';
import {
  Image,
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import courseData from '../data/courses.json';

export default function Courses({ navigation }) {
  const { setSelCourse } = useContext(CourseContext);
  const courses = courseData.courses;

  return (
    
    <View style={styles.container}>

     <View style={styles.parallelogram} />

      <Image source={require('../data/images/logo/escola.jpeg')} 
      style={styles.headerImage}
      />
       <Text style={styles.title}>Cursos Disponíveis</Text>
      <FlatList
      
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelCourse(item.id);
              navigation.navigate('Course');
            }}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff4',
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#340100',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:-30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#340100',
    bottom:-70,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0d2b7',
    
    
  },
  buttonText: {
    color: '#D6B373',
    fontSize: 18,
    textAlign: 'center',
    
  },
  parallelogram: {
    bottom: '33%',
    flex:1,
    width: '210%',
    height: '49%',
    backgroundColor: '#340100',
    justifyContent:'center',
    transform: [{ skewX: '-20deg' }, { rotate: '6deg' },{ translateY: 200 }
    ],
    position: 'absolute', 
    
  },
  headerImage: {
    marginLeft: 5,
    width: 800,
    height: 230,
    resizeMode: 'contain',
    alignSelf: 'center',
    bottom: 40,
    marginBottom:0,

  },
 
});
