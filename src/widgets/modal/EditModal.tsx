import {Button, Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {ADD_TITLE, X_IMG} from '../../screens/toDoList/constant';
import {useModal} from './useModal';
import {styles} from './styles';
import {EditModalProps} from './types';

const EditModal = memo(function EditModal({
  onPress,
  closeModal,
}: EditModalProps) {
  const {handleChangeText, handleAddItem} = useModal(onPress, closeModal);
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
});

export default EditModal;
