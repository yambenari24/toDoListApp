import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useMainScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };
    checkAuthState();
  }, []);

  return {isLoggedIn};
}
