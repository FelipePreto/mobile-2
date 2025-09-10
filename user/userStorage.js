import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userProgress');
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error('Failed to load user data', e);
    return {};
  }
};

export const addUserData = async (data) => {
  try {
    const existing = await getUserData();
    const merged = { ...existing, ...data };
    console.log("saving")
    await setUserData(merged);
  } catch (e) {
    console.error('Failed to add user data', e);
  }
};

export const setUserData = async (data) => {
  try {
    await AsyncStorage.setItem('userProgress', JSON.stringify(data));
    console.log(data);
    console.log("actual database");
    console.log(await getUserData())
  } catch (e) {
    console.error('Failed to save user data', e);
  }
};

export const initDB = async () => {
  const existing = await getUserData();
  if (Object.keys(existing).length === 0) {
    await setUserData({});
  }
};