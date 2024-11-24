import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {FlatListToDoList} from '../screens/toDoList';
import {Login} from '../screens/login';
import {EditModal} from '../widgets/editModal';
import {observer} from 'mobx-react-lite';
import {useMainScreen} from './useMainScreen';

const Stack = createStackNavigator();

const MainScreen = observer(() => {
  const {initScreen} = useMainScreen();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initScreen}>
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
});

export default MainScreen;
