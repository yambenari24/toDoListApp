import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';

const FloatingButton = function FloatingButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>;
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
  container: {
    backgroundColor: 'pink',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default memo(FloatingButton);
