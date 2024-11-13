import React from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import {useToDoList} from './useToDoList';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {ToDoListRowProps} from './components';
import {FloatingButton} from '../../ui/floatingButton';
import ToDoListReanimatedRow from './components/toDoListReanimatedRow/ToDoListReanimatedRow';

// const renderItem = (item: ToDoListRowProps) => {
//   return (
//     <ToDoListRow
//       key={item.toDoListItem.uuid}
//       toDoListItem={item.toDoListItem}
//       deleteItem={item.deleteItem}
//       isOpen={item.isOpen}
//       onSwipe={item.onSwipe}
//     />
//   );
// };

// const renderToDoListItems = (items: ToDoListRowProps[]) => {
//   return items.map(item => renderItem(item));
// };

const renderToDoListReanimatedItems = (items: ToDoListRowProps[]) => {
  return items.map(item => renderReanimatedItem(item));
};

const renderReanimatedItem = (item: ToDoListRowProps) => {
  return (
    <ToDoListReanimatedRow
      key={item.toDoListItem.uuid}
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

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <ScrollView style={styles.scrollContainer}>
        {renderToDoListReanimatedItems(enrichToDoListArray)}
      </ScrollView>
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <AddItemModal onPress={onItemAdd} closeModal={closeModal} />
      </Modal>
    </View>
  );
}
