import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../screens/login';
import {FlatListToDoList} from '../screens/toDoList';
import {NavigationParam} from './types';
import {useMainScreen} from './useMainScreen';

const Stack = createStackNavigator<NavigationParam>();

export default function MainScreen() {
  const {isLoggedIn} = useMainScreen();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'FlatListToDoList' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FlatListToDoList" component={FlatListToDoList} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // cover the whole screen
  },
});
