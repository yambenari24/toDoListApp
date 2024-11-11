import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {ToDoList} from './src/screens/toDoList';
import FlatListToDoList from './src/screens/toDoList/FlatListToDoList';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ToDoList />
      {/* <FlatListToDoList /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // cover the whole screen
  },
});
