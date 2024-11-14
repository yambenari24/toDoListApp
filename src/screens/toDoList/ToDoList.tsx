import React from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import {useToDoList} from './useToDoList';
import {styles} from './styles';
import {ToDoListRow, ToDoListRowProps} from './components';
import {FloatingButton} from '../../ui/floatingButton';
import {EditModal} from '../../widgets/editModal';

const renderItem = (item: ToDoListRowProps) => {
  return (
    <ToDoListRow
      key={item.toDoListItem.uuid}
      toDoListItem={item.toDoListItem}
      deleteItem={item.deleteItem}
      isOpen={item.isOpen}
      onSwipe={item.onSwipe}
      onEditItem={item.onEditItem}
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
    buttonState,
    enrichToDoListArray,
    selectedItemRef,
    onPressModal,
  } = useToDoList();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <ScrollView style={styles.scrollContainer}>
        {renderToDoListItems(enrichToDoListArray)}
      </ScrollView>
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <EditModal
          onPress={onPressModal}
          closeModal={closeModal}
          currentText={selectedItemRef.current?.text ?? ''}
        />
      </Modal>
    </View>
  );
}
