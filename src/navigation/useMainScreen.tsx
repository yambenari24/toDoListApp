import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useMemo} from 'react';
import {userStore} from '../store/userStore';
import {EDIT_TIT, LOGIN_TIT, TODO_TIT} from './constant';
import {colors} from '../theme/colors';
import useStore from './useStore';

export function useMainScreen() {
  const {initScreen} = useStore();

  const initialScreen = useMemo(() => {
    return initScreen ?? 'Login';
  }, [initScreen]);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          userStore.setUserToken = userToken;
        } else {
          userStore.setUserToken = null;
        }
      } catch (error) {
        console.log(error);
        userStore.setUserToken = null;
      }
    };
    checkAuthState();
  }, []);

  const todoListParams = useMemo(() => {
    return {title: TODO_TIT};
  }, []);

  const loginParams = useMemo(() => {
    return {title: LOGIN_TIT, headerShown: false};
  }, []);

  const editModalParams = useMemo(() => {
    return {
      presentation: 'modal',
      title: EDIT_TIT,
      headerShown: false,
      cardStyle: {backgroundColor: colors.transparentBackground},
    };
  }, []);

  return {todoListParams, loginParams, editModalParams, initialScreen};
}
