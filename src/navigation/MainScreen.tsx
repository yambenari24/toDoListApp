import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {FlatListToDoList} from '../screens/toDoList';
import {Login} from '../screens/login';
import {EditModal} from '../widgets/editModal';
import {observer} from 'mobx-react-lite';
import {useMainScreen} from './useMainScreen';
import useStore from './useStore';

const Stack = createStackNavigator();

const MainScreen = () => {
  useMainScreen();
  const {initScreen} = useStore();
  console.log(
    'ttt\x1b[32m',
    new Date().getMilliseconds(),
    new Date().toLocaleTimeString(),
    {initScreen},
    '\x1b[0m',
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initScreen ?? 'Login'}>
        <Stack.Screen
          name="FlatListToDoList"
          component={FlatListToDoList}
          options={{title: 'To-Do List'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="EditModal"
          component={EditModal}
          options={{
            presentation: 'modal',
            title: 'Edit Task',
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
