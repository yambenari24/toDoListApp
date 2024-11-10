import React from 'react';
import {FlatList, Modal, Text, View} from 'react-native';
import ToDoListRow from './components/ToDoListRow';
import FloatingButton from '../../ui/FloatingButton';
import {useToDoList} from './useToDoList';
import EditModal from '../../widgets/modal/EditModal';
import {ToDoListItem} from './types';
import {getUUIid} from './utils';
import {styles} from './styles';

const renderItem = (
  item: ToDoListItem,
  handleDeleteItem: (item: ToDoListItem) => void,
  openRow: string | null,
  handleRowSwipe: (uuid: string) => void,
) => {
  return (
    <ToDoListRow
      props={{
        toDoListItem: item,
        deleteItem: () => handleDeleteItem(item),
        isOpen: openRow === item.uuid,
        onSwipe: () => handleRowSwipe(item.uuid),
      }}
    />
  );
};

export default function ToDoList() {
  const {
    openModal,
    closeModal,
    modalVisible,
    toDoListArray,
    onItemAdd,
    onShowDeleteAlert,
    openRow,
    handleRowSwipe,
    buttonState,
  } = useToDoList();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={toDoListArray}
        renderItem={({item}) =>
          renderItem(item, onShowDeleteAlert, openRow, handleRowSwipe)
        }
      />
      <FloatingButton onPress={openModal} title={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <EditModal closeModal={closeModal} onPress={onItemAdd} />
      </Modal>
    </View>
  );
}
