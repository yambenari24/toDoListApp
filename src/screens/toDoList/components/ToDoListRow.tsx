import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {BIN_IMG} from '../constant';
import {useToDoListRow} from './useToDoListRow';
import {ToDoListRowProps} from './types';
import {SCREEN_WIDTH} from './constant';

const ToDoListRow = ({props}: {props: ToDoListRowProps}) => {
  const {animatedRowStyle, panResponder} = useToDoListRow(
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
      <Animated.View
        style={[styles.row, animatedRowStyle]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{props.toDoListItem.text}</Text>
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
