import {useCallback, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToDoListScreenNavigationProp} from '../../navigation';
import {toDoListStore} from '../../store/toDoListStore';
import {ToDoListItem} from './types';
import useStore from './useStore';

export function useToDoList(navigation: ToDoListScreenNavigationProp) {
  const {openRow} = useStore();
  const onAddItem = useCallback((itemText: string) => {
    toDoListStore.addItem(itemText);
  }, []);

  const onEditItem = useCallback(
    function onEditItem(item: ToDoListItem) {
      toDoListStore.openModal();
      toDoListStore.editItem(item);
      navigation.navigate('EditModal');
    },
    [navigation],
  );

  const onPressLogout = useCallback(
    function onPressLogout() {
      AsyncStorage.removeItem('userToken')
        .then(() => {
          console.log('User logged out, token removed');
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        })
        .catch(error => {
          console.error('Error during logout: ', error);
        });
    },
    [navigation],
  );

  const onPressFloatingButton = useCallback(() => {
    toDoListStore.openModal();
    navigation.navigate('EditModal');
  }, [navigation]);

  const enrichToDoListArray = useMemo(() => {
    return toDoListStore.items.map(item => ({
      toDoListItem: item,
      deleteItem: () => toDoListStore.onShowDeleteAlert(item),
      isOpen: openRow === item.uuid,
      onSwipe: () => console.log('by'),
      onEditItem: () => onEditItem(item),
    }));
  }, [onEditItem, openRow]);

  return {
    onAddItem,
    onEditItem,
    onPressLogout,
    onPressFloatingButton,
    enrichToDoListArray,
  };
}
