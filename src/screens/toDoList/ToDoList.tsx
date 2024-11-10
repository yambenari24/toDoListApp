import React from 'react';
import {FlatList, ListRenderItem, Modal, Text, View} from 'react-native';
import ToDoListRow from './components/ToDoListRow';
import FloatingButton from '../../ui/FloatingButton';
import {useToDoList} from './useToDoList';
import {getUUIid} from './utils';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {ToDoListRowProps} from './components';

const renderItem: ListRenderItem<ToDoListRowProps> = ({item}) => {
  return (
    <ToDoListRow
      toDoListItem={item.toDoListItem}
      deleteItem={item.deleteItem}
      isOpen={item.isOpen}
      onSwipe={item.onSwipe}
    />
  );
};

export default function ToDoList() {
  const {
    openModal,
    closeModal,
    modalVisible,
    onItemAdd,
    buttonState,
    enrichToDoListArray,
  } = useToDoList();

  console.log(
    'ttt\x1b[33m',
    new Date().getMilliseconds(),
    new Date().toLocaleTimeString(),
    typeof onItemAdd,
    '\x1b[0m',
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={enrichToDoListArray}
        renderItem={renderItem}
      />
      <FloatingButton onPress={openModal} title={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <AddItemModal onPress={onItemAdd} closeModal={closeModal} />
      </Modal>
    </View>
  );
}
