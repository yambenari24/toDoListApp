import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
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
import {useNavigation} from '@react-navigation/native';
import {LOGOUT_ICON} from './constant';
import useStore from './useStore';

const renderItem: ListRenderItem<ToDoListRowProps> = ({item}) => (
  <ToDoListRow
    toDoListItem={item.toDoListItem}
    deleteItem={item.deleteItem}
    isOpen={item.isOpen}
    onSwipe={item.onSwipe}
    onEditItem={item.onEditItem}
  />
);

const FlatListToDoList = () => {
  const navigation = useNavigation();
  const {enrichToDoListArray, onPressLogout, onPressFloatingButton} =
    useToDoList(navigation);

  const {floatingButtonSign} = useStore();
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={enrichToDoListArray}
        renderItem={renderItem}
      />
      <FloatingButton
        onPress={onPressFloatingButton}
        sign={floatingButtonSign}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Image source={LOGOUT_ICON} style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default FlatListToDoList;
