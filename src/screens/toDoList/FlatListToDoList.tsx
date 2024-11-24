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
import {toDoListStore} from '../../store/toDoListStore';
import {observer} from 'mobx-react-lite';
import {FloatingButton} from '../../ui/floatingButton';
import {useNavigation} from '@react-navigation/native';
import {LOGOUT_ICON} from './constant';

const renderItem =
  (
    onEditItem: (item: ToDoListRowProps) => void,
  ): ListRenderItem<ToDoListRowProps> =>
  ({item}) =>
    (
      <ToDoListRow
        toDoListItem={item.toDoListItem}
        deleteItem={item.deleteItem}
        isOpen={item.isOpen}
        onSwipe={item.onSwipe}
        onEditItem={() => onEditItem(item)}
      />
    );

const FlatListToDoList = observer(() => {
  const navigation = useNavigation();
  const {onPressLogout, onPressFloatingButton, onEditItem} =
    useToDoList(navigation);
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>To Do List</Text>
      <FlatList
        keyExtractor={getUUIid}
        data={toDoListStore.enrichedToDoList}
        renderItem={renderItem(onEditItem)}
      />
      <FloatingButton
        onPress={onPressFloatingButton}
        sign={toDoListStore.floatingButtonState}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Image source={LOGOUT_ICON} style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
});

export default FlatListToDoList;
