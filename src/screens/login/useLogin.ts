import {useCallback, useRef} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginScreenNavigationProp} from '../../navigation';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const usersCollection = firestore().collection('users');

  const handlePressConfirm = useCallback(
    async function handlePressConfirm() {
      try {
        const user = usersCollection.doc(usernameRef.current);
        const docSnapshot = await user.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          if (userData?.password === passwordRef.current) {
            await AsyncStorage.setItem('userToken', 'authenticated');
            navigation.navigate('FlatListToDoList');
          } else {
            Alert.alert('Invalid Credentials');
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [navigation, usersCollection],
  );

  const handleUsernameChange = useCallback((username: string) => {
    usernameRef.current = username;
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    passwordRef.current = password;
  }, []);

  return {
    handlePressConfirm,
    handleUsernameChange,
    handlePasswordChange,
  };
}
