import React, {memo} from 'react';
import {Text, View, TouchableOpacity, Animated, Image} from 'react-native';
import {BIN_IMG, EDIT_ICON} from '../constant';
import {useToDoListRow} from './useToDoListRow';
import {ToDoListRowProps} from './types';
import {styles} from './styles';

const ToDoListRow = (props: ToDoListRowProps) => {
  const {
    panResponder,
    animatedStyle,
    handlePressIn,
    handlePressOut,
    scalingStyle,
  } = useToDoListRow(props.isOpen, props.onSwipe);

  return (
    <Animated.View style={scalingStyle}>
      <View style={styles.deleteBackground}>
        <TouchableOpacity onPress={props.deleteItem}>
          <Image style={styles.imageBin} source={BIN_IMG} />
        </TouchableOpacity>
      </View>
      <Animated.View style={animatedStyle} {...panResponder.panHandlers}>
        <Text style={styles.text}>{props.toDoListItem.text}</Text>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={props.onEditItem}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <Image style={styles.edit} source={EDIT_ICON} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(ToDoListRow);
