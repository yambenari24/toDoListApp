import React from 'react';
import {FlatList, ListRenderItem, Modal, Text, View} from 'react-native';
import {ToDoListRowProps} from './components';
import {useToDoList} from './useToDoList';
import {getUUIid} from './utils';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {FloatingButton} from '../../ui/floatingButton';
import {ToDoListReanimatedRow} from './components/toDoListReanimatedRow';

// const renderItem: ListRenderItem<ToDoListRowProps> = ({item}) => {
//   return (
//     <ToDoListRow
//       toDoListItem={item.toDoListItem}
//       deleteItem={item.deleteItem}
//       isOpen={item.isOpen}
//       onSwipe={item.onSwipe}
//     />
//   );
// };

const renderReanimatedItem: ListRenderItem<ToDoListRowProps> = ({item}) => {
  return (
    <ToDoListReanimatedRow
      toDoListItem={item.toDoListItem}
      deleteItem={item.deleteItem}
      isOpen={item.isOpen}
      onSwipe={item.onSwipe}
    />
  );
};

export default function FlatListToDoList() {
  const {
    openModal,
    closeModal,
    modalVisible,
    onItemAdd,
    buttonState,
    enrichToDoListArray,
  } = useToDoList();

  console.log(
    'ttt\x1b[42m',
    new Date().getMilliseconds(),
    new Date().toLocaleTimeString(),
    'flat list render',
    '\x1b[0m',
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={enrichToDoListArray}
        renderItem={renderReanimatedItem}
      />
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={false}>
        <AddItemModal onPress={onItemAdd} closeModal={closeModal} />
      </Modal>
    </View>
  );
}
