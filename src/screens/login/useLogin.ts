import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {runInAction} from 'mobx';
import {LoginScreenNavigationProp} from '../../navigation';
import {userStore} from '../../store/userStore';
import {useCallback} from 'react';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const login = useCallback(async (onSuccess: () => void): Promise<void> => {
    try {
      if (!userStore.userName || !userStore.userPassword) {
        Alert.alert(
          'Validation Error',
          'Please enter both username and password.',
        );
        return;
      }

      const userDoc = firestore().collection('users').doc(userStore.userName);
      const docSnapshot = await userDoc.get();

      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        if (userData?.password === userStore.userPassword) {
          await AsyncStorage.setItem('userToken', 'authenticated');
          runInAction(() => {
            userStore.setUserToken = 'authenticated';
          });
          onSuccess();
        } else {
          Alert.alert(
            'Invalid Credentials',
            'The username or password is incorrect.',
          );
        }
      } else {
        Alert.alert(
          'User Not Found',
          'No user exists with the provided username.',
        );
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    }
  }, []);

  const handlePressConfirm = useCallback(() => {
    login(() => {
      navigation.navigate('FlatListToDoList');
    });
  }, [login, navigation]);

  const handleUsernameChange = useCallback((username: string) => {
    runInAction(() => {
      userStore.setUserName = username;
    });
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    runInAction(() => {
      userStore.setPassword = password;
    });
  }, []);

  return {
    handlePressConfirm,
    handleUsernameChange,
    handlePasswordChange,
  };
}
