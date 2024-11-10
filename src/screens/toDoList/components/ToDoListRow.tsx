import React, {memo, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import {BIN_IMG} from '../constant';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ToDoListRow = ({
  toDoListItem,
  deleteItem,
  isOpen,
  onSwipe,
}: {
  toDoListItem: {text: string; uuid: string};
  deleteItem: () => void;
  isOpen: boolean;
  onSwipe: () => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.spring(translateX, {
        toValue: -SCREEN_WIDTH * 0.2,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          onSwipe();
          Animated.spring(translateX, {
            toValue: -SCREEN_WIDTH * 0.2,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const animatedRowStyle = {
    transform: [{translateX}],
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.deleteBackground}>
        <TouchableOpacity onPress={deleteItem}>
          <Image style={styles.imageBin} source={require(BIN_IMG)} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.row, animatedRowStyle]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{toDoListItem.text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  row: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
  },
  deleteBackground: {
    position: 'absolute',
    height: '100%',
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.2,
    backgroundColor: '#FA5F55',
    borderRadius: 5,
    justifyContent: 'center',
  },
  imageBin: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});

export default memo(ToDoListRow);
