import {Button, Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {X_IMG} from '../../screens/toDoList/constant';
import {useModal} from './useModal';
import {EditModalProps} from '../AddItemModal/types';
import {styles} from '../addItemModal/styles';

const EditModal = memo(function EditModal({
  onPress,
  closeModal,
  currentText,
}: EditModalProps) {
  const {handleChangeText, handleAddItem, buttonTitle} = useModal(
    onPress,
    closeModal,
    currentText,
  );
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal}>
          <Image style={styles.xButton} source={X_IMG} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          defaultValue={currentText}
          onChangeText={handleChangeText}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={handleAddItem} title={buttonTitle} />
        </View>
      </View>
    </View>
  );
});

export default EditModal;
