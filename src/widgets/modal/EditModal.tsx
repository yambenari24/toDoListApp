import {
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ADD_TITLE, X_IMG} from '../../screens/toDoList/constant';
import {ToDoListItemProps} from '../../screens/toDoList';
import {useModal} from './useModal';

export default function EditModal({
  addItem,
  closeModal,
}: {
  addItem: (toDoListItem: ToDoListItemProps) => void;
  closeModal: () => void;
}) {
  const {handleChangeText, handleAddItem} = useModal(addItem, closeModal);

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal}>
          <Image style={styles.xButton} source={X_IMG} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          onChangeText={handleChangeText}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={handleAddItem} title={ADD_TITLE} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'grey',
    width: '80%',
    height: '50%',
    borderRadius: 8,
  },
  inputContainer: {
    top: 16,
    bottom: 16,
    margin: 8,
    padding: 8,
    width: '100%',
  },
  xButton: {
    top: 20,
    left: 20,
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 16,
  },
});
