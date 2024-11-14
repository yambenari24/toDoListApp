import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Login from './src/screens/toDoList/login/Login';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ToDoList /> */}
      {/* <FlatListToDoList /> */}
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // cover the whole screen
  },
});
