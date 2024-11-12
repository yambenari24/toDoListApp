import React from 'react';
import {FlatList, ListRenderItem, Modal, Text, View} from 'react-native';
import {ToDoListRow} from './components';
import {useToDoList} from './useToDoList';
import {getUUIid} from './utils';
import {styles} from './styles';
import {AddItemModal} from '../../widgets/modal';
import {FlatListToDoListProps} from './components';
import {FloatingButton} from '../../ui/floatingButton';

const renderItem: ListRenderItem<FlatListToDoListProps> = ({item}) => {
  return (
    <ToDoListRow
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
    enrichFlatListToDoListArray,
  } = useToDoList();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={enrichFlatListToDoListArray}
        renderItem={renderItem}
      />
      <FloatingButton onPress={openModal} sign={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <AddItemModal onPress={onItemAdd} closeModal={closeModal} />
      </Modal>
    </View>
  );
}
