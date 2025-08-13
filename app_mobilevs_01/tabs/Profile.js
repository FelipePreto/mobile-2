import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { setUserData } from '../user/userStorage';

export default function Profile() {
  return (
    <View>
      <TouchableOpacity style={style.button} onPress={() => setUserData({})}>
        Reset Progress
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    padding: 40,
    borderColor: '#D6B373',
    borderWidth: 2,
  },
});
