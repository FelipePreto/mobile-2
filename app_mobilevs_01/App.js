import { Text, ScrollView, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseProvider from './context/CourseProvider';

// tabs
import Courses from './tabs/Courses';
import Profile from './tabs/Profile';

// stacks
import Course from './stacks/Course';
import Lesson from './stacks/Lesson';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Courses"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navigation,
        tabBarActiveTintColor: '#D6B373',
        tabBarInactiveTintColor: '#D6B373',
        animation: 'fade',
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
      }}>
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="sticky-note" size={26} color="#e0d2b7" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={26} color="#e0d2b7" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Course" component={Course} />
          <Stack.Screen name="Lesson" component={Lesson} />
        </Stack.Navigator>
      </NavigationContainer>
    </CourseProvider>
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#340100',
    borderTopWidth: 0,
  },
});
