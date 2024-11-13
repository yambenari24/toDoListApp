import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {FlatListToDoList, ToDoList} from './src/screens/toDoList';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ToDoList /> */}
      <FlatListToDoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // cover the whole screen
  },
});
