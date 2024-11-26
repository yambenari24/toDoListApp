import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {userStore} from '../store/userStore';

export function useMainScreen() {
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          userStore.setUserToken(userToken);
        } else {
          userStore.setUserToken(null);
        }
      } catch (error) {
        console.log(error);
        userStore.setUserToken(null);
      }
    };
    checkAuthState();
  }, []);
}
