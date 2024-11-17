import {useRef} from 'react';
import {Alert} from 'react-native';
import {LoginScreenNavigationProp} from './types';
import firestore from '@react-native-firebase/firestore';
import app from '@react-native-firebase/app';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const userName = useRef('');
  const password = useRef('');

  if (app.apps.length === 0) {
    console.log('Connecting to Firebase...');
    app.initializeApp({
      apiKey: 'AIzaSyBg_KiOZyJFlULM4bCFCZxpjD91yRo8jUI',
      authDomain: 'todolist-1ed4a.firebaseapp.com',
      projectId: 'todolist-1ed4a',
      storageBucket: 'todolist-1ed4a.appspot.com', // Correct storage bucket
      messagingSenderId: '532361510962',
      appId: '1:532361510962:android:f8e655a768f90557a3fc2b',
    });
    console.log('Firebase app initialized:', app.apps.length); // Should be 1 now
  } else {
    console.log('Firebase already initialized:', app.apps.length);
  }

  async function checkIsValid() {
    try {
      const userRef = firestore().collection('users').doc(userName.current);
      const docSnapshot = await userRef.get();

      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        if (userData?.password === password.current) {
          navigation.navigate('FlatListToDoList');
        } else {
          Alert.alert('Invalid credentials');
        }
      }
    } catch (error) {
      console.log(
        'ttt\x1b[44m',
        new Date().getMilliseconds(),
        new Date().toLocaleTimeString(),
        error,
        '\x1b[0m',
      );
      Alert.alert('Invalid');
    }
  }

  return {userName, password, checkIsValid};
}
