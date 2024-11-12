import React, {memo} from 'react';
import {Text, View, TouchableOpacity, Animated, Image} from 'react-native';
import {BIN_IMG} from '../constant';
import {useToDoListRow} from './useToDoListRow';
import {ToDoListRowProps} from './types';
import {styles} from './styles';

const ToDoListRow = (props: ToDoListRowProps) => {
  const {panResponder, animatedStyle} = useToDoListRow(
    props.isOpen,
    props.onSwipe,
  );

  return (
    <View style={styles.rowContainer}>
      <View style={styles.deleteBackground}>
        <TouchableOpacity onPress={props.deleteItem}>
          <Image style={styles.imageBin} source={BIN_IMG} />
        </TouchableOpacity>
      </View>
      <Animated.View style={animatedStyle} {...panResponder.panHandlers}>
        <Text style={styles.text}>{props.toDoListItem.text}</Text>
      </Animated.View>
    </View>
  );
};

export default memo(ToDoListRow);
