import {useRef} from 'react';
import {Alert} from 'react-native';
import {LoginScreenNavigationProp} from './types';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/app';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const usersCollection = firestore().collection('users');

  async function isValidUser() {
    try {
      console.log('hi');
      const userRef = usersCollection.doc(usernameRef.current);
      const docSnapshot = await userRef.get();
      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        if (userData?.password === passwordRef.current) {
          navigation.navigate('FlatListToDoList');
        } else {
          Alert.alert('Invalid Credentials');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUsernameChange = (username: string) => {
    usernameRef.current = username;
  };

  const handlePasswordChange = (password: string) => {
    passwordRef.current = password;
  };

  return {
    isValidUser,
    handleUsernameChange,
    handlePasswordChange,
  };
}
