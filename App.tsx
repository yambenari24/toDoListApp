import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Login from './src/screens/toDoList/login/Login';
import {createStackNavigator} from '@react-navigation/stack';
import {FlatListToDoList} from './src/screens/toDoList';
import {NavigationContainer} from '@react-navigation/native';
import {LoginParam} from './src/screens/toDoList/login';

const Stack = createStackNavigator<LoginParam>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
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
