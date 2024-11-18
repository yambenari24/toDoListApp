import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ToDoListRowProps} from './components';
import {useToDoList} from './useToDoList';
import {getUUIid} from './utils';
import {styles} from './styles';
import {ToDoListRow} from './components';
import {FloatingButton} from '../../ui/floatingButton';
import {EditModal} from '../../widgets/editModal';
import {LOGOUT_ICON} from './constant';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParam} from '../mainScreen';

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

export default function FlatListToDoList({
  navigation,
}: {
  navigation: StackNavigationProp<NavigationParam, 'FlatListToDoList'>;
}) {
  const {
    openModal,
    closeModal,
    modalVisible,
    buttonState,
    enrichToDoListArray,
    selectedItemRef,
    onPress,
    onPressLogout,
  } = useToDoList({navigation});

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
          onPress={onPress}
          closeModal={closeModal}
          currentText={selectedItemRef.current?.text ?? ''}
        />
      </Modal>
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Image source={LOGOUT_ICON} style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
}
