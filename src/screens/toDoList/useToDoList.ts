import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToDoListScreenNavigationProp} from '../../navigation';
import {toDoListStore} from '../../store/toDoListStore';
import {ToDoListRowProps} from './components';

export function useToDoList(navigation: ToDoListScreenNavigationProp) {
  function onEditItem(item: ToDoListRowProps) {
    toDoListStore.openModal();
    toDoListStore.editItem(item.toDoListItem);
    navigation.navigate('EditModal');
  }

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

  const onPressFloatingButton = () => {
    toDoListStore.openModal();
    navigation.navigate('EditModal');
  };

  return {
    onEditItem,
    onPressLogout,
    onPressFloatingButton,
  };
}
