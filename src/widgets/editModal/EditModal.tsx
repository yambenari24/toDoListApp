import {Button, Image, TextInput, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {X_IMG} from '../../screens/toDoList/constant';
import {useModal} from './useModal';
import {styles} from '../addItemModal/styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavigationParam} from '../../navigation';

type EditModalRouteProp = RouteProp<NavigationParam, 'EditModal'>;

const EditModal = () => {
  const route = useRoute<EditModalRouteProp>();
  const {currentText, onPressConfirm, onPressCancel} = route.params;

  const {closeModal, onHandleChangeText, onPressButton, buttonTitle} = useModal(
    currentText,
    onPressConfirm,
    onPressCancel,
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
          onChangeText={onHandleChangeText}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onPressButton} title={buttonTitle} />
        </View>
      </View>
    </View>
  );
};

export default memo(EditModal);
