import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {runInAction} from 'mobx';
import {LoginScreenNavigationProp} from '../../navigation';
import {userStore} from '../../store/userStore';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const login = async (onSuccess: () => void): Promise<void> => {
    try {
      if (!userStore.userName || !userStore.userPassword) {
        Alert.alert(
          'Validation Error',
          'Please enter both username and password.',
        );
        return;
      }

      const userDoc = firestore().collection('users').doc(userStore.userName);

      console.log(
        'ttt\x1b[44m',
        new Date().getMilliseconds(),
        new Date().toLocaleTimeString(),
        {userDoc},
        '\x1b[0m',
      );
      const docSnapshot = await userDoc.get();

      console.log(
        'ttt\x1b[44m',
        new Date().getMilliseconds(),
        new Date().toLocaleTimeString(),
        {docSnapshot},
        '\x1b[0m',
      );

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
  };

  const handlePressConfirm = () => {
    login(() => {
      navigation.navigate('FlatListToDoList');
    });
  };

  const handleUsernameChange = (username: string) => {
    runInAction(() => {
      userStore.setUserName = username;
    });
  };

  const handlePasswordChange = (password: string) => {
    runInAction(() => {
      userStore.setPassword = password;
    });
  };

  return {
    handlePressConfirm,
    handleUsernameChange,
    handlePasswordChange,
  };
}
