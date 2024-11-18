import React from 'react';
import {MainScreen} from './src/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={style.container}>
      <MainScreen />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
