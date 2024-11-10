import React, {useMemo} from 'react';
import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import ToDoListRow from './components/ToDoListRow';
import FloatingButton from '../../ui/FloatingButton';
import {useToDoList} from './useToDoList';
import EditModal from '../../widgets/modal/EditModal';
import {useModal} from '../../widgets/modal/useModal';

export default function ToDoList() {
  const {
    toDoListArray,
    handleAddItem,
    handleDeleteItem,
    openRow,
    handleRowSwipe,
  } = useToDoList();

  const {modalVisible, openModal, closeModal} = useModal();

  const buttonState = useMemo(() => {
    return modalVisible ? '-' : '+';
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={item => item.uuid}
        data={toDoListArray}
        renderItem={({item}) => {
          return (
            <ToDoListRow
              toDoListItem={item}
              deleteItem={() => handleDeleteItem(item)}
              isOpen={openRow === item.uuid}
              onSwipe={() => handleRowSwipe(item.uuid)}
            />
          );
        }}
      />
      <FloatingButton onPress={openModal} title={buttonState} />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <EditModal closeModal={closeModal} addItem={handleAddItem} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textHeader: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 16,
    marginTop: 8,
  },
});
