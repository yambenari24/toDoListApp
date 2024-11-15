import {StackNavigationProp} from '@react-navigation/stack';

export type LoginParam = {
  Login: undefined;
  FlatListToDoList: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  LoginParam,
  'Login'
>;
