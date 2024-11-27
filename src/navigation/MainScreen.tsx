import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {FlatListToDoList} from '../screens/toDoList';
import {Login} from '../screens/login';
import {EditModal} from '../widgets/editModal';
import {useMainScreen} from './useMainScreen';

const Stack = createStackNavigator();

const MainScreen = () => {
  const {todoListParams, loginParams, editModalParams, initialScreen} =
    useMainScreen();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen
          name="FlatListToDoList"
          component={FlatListToDoList}
          options={todoListParams}
        />
        <Stack.Screen name="Login" component={Login} options={loginParams} />
        <Stack.Screen
          name="EditModal"
          component={EditModal}
          options={editModalParams}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
