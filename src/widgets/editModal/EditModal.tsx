import {Button, Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {X_IMG} from '../../screens/toDoList/constant';
import {useModal} from './useModal';
import {styles} from '../addItemModal/styles';
import {EditModalNavigationProp} from '../../navigation';
import {toDoListStore} from '../../store/toDoListStore';

const EditModal = memo(function EditModal({
  navigation,
}: {
  navigation: EditModalNavigationProp;
}) {
  const {closeModal, onHandleChangeText, onPressModal} = useModal(navigation);
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={closeModal}>
          <Image style={styles.xButton} source={X_IMG} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          defaultValue={toDoListStore.selectedItem?.text ?? ''}
          onChangeText={onHandleChangeText}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onPressModal} title={'DONE'} />
        </View>
      </View>
    </View>
  );
});

export default EditModal;
