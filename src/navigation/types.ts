import {StackNavigationProp} from '@react-navigation/stack';

export type NavigationParam = {
  Login: undefined;
  FlatListToDoList: undefined;
  EditModal: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  NavigationParam,
  'Login'
>;

export type ToDoListScreenNavigationProp = StackNavigationProp<
  NavigationParam,
  'FlatListToDoList'
>;

export type EditModalNavigationProp = StackNavigationProp<
  NavigationParam,
  'EditModal'
>;
