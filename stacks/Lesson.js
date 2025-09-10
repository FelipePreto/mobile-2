import { useState, useContext } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CourseContext } from '../context/CourseProvider';
import { imageMap } from '../data/images/imageMap';
import { addUserData } from '../user/userStorage';

export default function Lesson({ navigation }) {
  const { selLesson } = useContext(CourseContext);

  const [selOption, setSelOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  function currentStyle(i) {
    if (selOption !== i) return styles.option;
    const correctOptionIndex = selLesson.exercises[questionIndex].answerIndex;
    if (isCorrect == null) return styles.selectedOption;
    return correctOptionIndex === i ? styles.correctOption : styles.wrongOption;
  }

  function returnCourse() {
    navigation.navigate('Course');
    setQuestionIndex(0);
  }

  async function finishLesson() {
    await addUserData({ [selLesson.id]: true });
    returnCourse();
  }

  function nextExercise() {
    setIsCorrect(null);
    setSelOption(null);
    setQuestionIndex(questionIndex + 1);
  }

  function selectOption(i) {
    if (isCorrect) return;
    setIsCorrect(null);
    setSelOption(i);
  }

  if (!selLesson.exercises[questionIndex]) navigation.navigate('Course');

  const exercise = selLesson.exercises[questionIndex];

  return (
    <View style={styles.container}>
    <View style={styles.parallelogram} />

      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.navigate('Course')}
      >
        <FontAwesome6 name="arrow-left" size={32} color="#e0d2b7" />
      </TouchableOpacity>

      {selLesson && (
        <>
          <Text style={styles.lessonName}>{selLesson.name}</Text>

          {exercise.text != null && (
            <View style={styles.textContainer}>
              <Text style={styles.exerciseText}>{exercise.text}</Text>
            </View>
          )}

          {exercise.image != null && (
            <Image
              source={imageMap[exercise.image]}
              style={styles.mainImage}
              resizeMode="contain"
            />
          )}

          {exercise.options != null && (
            <View style={styles.options}>
              {exercise.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => selectOption(i)}
                  style={currentStyle(i)}
                >
                  {option.text != null && (
                    <Text style={styles.optionText}>{option.text}</Text>
                  )}
                  {option.image != null && (
                    <Image
                      source={imageMap[option.image]}
                      style={[
                        styles.optionImage,
                        option.imageSize || { width: 80, height: 80 },
                      ]}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.navigation}>
            {(exercise.type === 'explanation' || isCorrect) && (
              <TouchableOpacity
                onPress={() => {
                  setSelOption(null);
                  selLesson.exercises[questionIndex + 1]
                    ? nextExercise()
                    : finishLesson();
                }}
              >
                <FontAwesome6 name="arrow-right" size={100} color="black" />
              </TouchableOpacity>
            )}

            {exercise.type === 'question' && !isCorrect && (
              <TouchableOpacity
                onPress={() => {
                  selOption === exercise.answerIndex
                    ? setIsCorrect(true)
                    : setIsCorrect(false);
                }}
              >
                <FontAwesome6
                  name={isCorrect === false ? 'x' : 'question'}
                  size={100}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#51241F',
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  exitButton: {
    marginBottom: 20,
  },
  lessonName: {
    fontSize: 28, // maior fonte para o título da lição
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50,
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 30, // fonte do texto da explicação/pergunta
    marginBottom:50,
    color: 'white',
  },
  mainImage: {
    width: 150,
    height: 250,
    alignSelf: 'center',
    marginBottom: 15,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  option: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  selectedOption: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  correctOption: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#7df043',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  wrongOption: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#c93030',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  optionText: {
    fontSize: 30, // tamanho da fonte das opções
    color:"#e0d2b7",
    textAlign: 'center',
  },
  optionImage: {
    marginTop: 5,
  },
  navigation: {
    marginTop: 20,
    alignItems: 'center',
  },
   parallelogram: {
    bottom: 900,
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
