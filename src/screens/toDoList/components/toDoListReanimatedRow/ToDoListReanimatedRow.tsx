import React, {memo, useCallback} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {BIN_IMG} from '../../constant';
import {ToDoListRowProps} from '../types';
import {styles} from '../styles';
import {useToDoListReanimatedRow} from './useToDoListReanimatedRow';

const ToDoListReanimatedRow = (props: ToDoListRowProps) => {
  const {panGesture, animatedRowStyle} = useToDoListReanimatedRow(
    props.isOpen,
    props.onSwipe,
  );

  console.log(
    'ttt\x1b[43m',
    new Date().getMilliseconds(),
    new Date().toLocaleTimeString(),
    'row render',
    '\x1b[0m',
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.rowContainer}>
        <View style={styles.deleteBackground}>
          <TouchableOpacity onPress={props.deleteItem}>
            <Image style={styles.imageBin} source={BIN_IMG} />
          </TouchableOpacity>
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.row, animatedRowStyle]}>
            <Text style={styles.text}>{props.toDoListItem.text}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default memo(ToDoListReanimatedRow);
