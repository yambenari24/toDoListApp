import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class UserStore {
  userToken: string | null = null;
  username: string = '';
  password: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUserToken(token: string | null) {
    this.userToken = token;
  }

  clearUserToken() {
    this.userToken = null;
  }

  clearCredential() {
    this.username = '';
    this.password = '';
  }

  async login(onSuccess: () => void) {
    try {
      const userDoc = firestore().collection('users').doc(this.username);
      const docSnapshot = await userDoc.get();

      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        if (userData?.password === this.password) {
          await AsyncStorage.setItem('userToken', 'authenticated');
          runInAction(() => {});
          onSuccess();
        } else {
          Alert.alert('Invalid Credentials');
        }
      } else {
        Alert.alert('User does not exist');
      }
    } catch (error) {
      Alert.alert('Something went wrong... try again');
    } finally {
      runInAction(() => {});
    }
  }
}

export const userStore = new UserStore();
