import React from 'react';
import {Modal, Text, View} from 'react-native';
import ToDoListRow from './components/ToDoListRow';
import FloatingButton from '../../ui/floatingButton/FloatingButton';
import {useToDoList} from './useToDoList';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {ToDoListRowProps} from './components';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';

const renderItem = (item: ToDoListRowProps) => {
  return (
    <ToDoListRow
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
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
}
