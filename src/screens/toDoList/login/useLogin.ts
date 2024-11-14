import {useRef, useState} from 'react';
import {Alert} from 'react-native';

export function useLogin() {
  const userName = useRef('');
  const password = useRef('');

  const [valid, setIsValid] = useState<boolean | null>(null);

  function checkIsValid() {
    if (userName.current !== 'Yam' || password.current !== '123') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    validAction();
  }

  function validAction() {
    if (valid) {
      Alert.alert('Valid Password');
    } else if (valid !== null) {
      Alert.alert('Your username or password is wrong');
    }
  }

  return {userName, password, checkIsValid};
}
