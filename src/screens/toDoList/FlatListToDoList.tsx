import React from 'react';
import {FlatList, ListRenderItem, Modal, Text, View} from 'react-native';
import {ToDoListRowProps} from './components';
import {useToDoList} from './useToDoList';
import {getUUIid} from './utils';
import {styles} from './styles';
import {ToDoListRow} from './components';
import {FloatingButton} from '../../ui/floatingButton';
import {EditModal} from '../../widgets/editModal';

const renderItem: ListRenderItem<ToDoListRowProps> = ({item}) => {
  return (
    <ToDoListRow
      toDoListItem={item.toDoListItem}
      deleteItem={item.deleteItem}
      isOpen={item.isOpen}
      onSwipe={item.onSwipe}
      onEditItem={item.onEditItem}
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
    selectedItemRef,
    handleEditItem,
  } = useToDoList();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={enrichToDoListArray}
        renderItem={renderItem}
      />
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <EditModal
          onPress={
            selectedItemRef.current?.text === '' ? onItemAdd : handleEditItem
          }
          closeModal={closeModal}
          currentText={selectedItemRef.current?.text ?? ''}
        />
      </Modal>
    </View>
  );
}
