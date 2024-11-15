import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import {LoginScreenNavigationProp} from './types';

export function useLogin({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const userName = useRef('');
  const password = useRef('');

  const [valid, setIsValid] = useState<boolean | null>(null);

  function checkIsValid() {
    if (userName.current !== 'Yam' || password.current !== '123') {
      setIsValid(false);
    } else {
      navigation.navigate('FlatListToDoList');
    }
    validAction();
  }

  function validAction() {
    if (valid) {
      Alert.alert('Valid Password');
    } else if (valid !== null) {
      navigation.navigate('FlatListToDoList');
    }
  }

  return {userName, password, checkIsValid};
}
