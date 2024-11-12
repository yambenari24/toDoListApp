import React from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import {useToDoList} from './useToDoList';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {ToDoListRow, ToDoListRowProps} from './components';
import {FloatingButton} from '../../ui/floatingButton';

const renderItem = (item: ToDoListRowProps) => {
  return (
    <ToDoListRow
      key={item.toDoListItem.uuid}
      toDoListItem={item.toDoListItem}
      deleteItem={item.deleteItem}
      isOpen={item.isOpen}
      onSwipe={item.onSwipe}
    />
  );
};

const renderToDoListItems = (items: ToDoListRowProps[]) => {
  return items.map(item => renderItem(item));
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

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <ScrollView style={styles.scrollContainer}>
        {renderToDoListItems(enrichToDoListArray)}
      </ScrollView>
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <AddItemModal onPress={onItemAdd} closeModal={closeModal} />
      </Modal>
    </View>
  );
}
