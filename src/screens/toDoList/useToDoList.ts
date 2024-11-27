import {useCallback, useMemo, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToDoListScreenNavigationProp} from '../../navigation';
import {toDoListStore} from '../../store/toDoListStore';
import {ToDoListItem} from './types';
import {Alert} from 'react-native';
import {
  ALERT_BUTTON_SUBTITLE,
  ALERT_BUTTON_TITLE,
  CANCEL_BUTTON,
  YES_BUTTON,
} from './constant';
import {generateUniqueId} from './utils';
import {useStore} from './useStore';

export function useToDoList(navigation: ToDoListScreenNavigationProp) {
  const {floatingButtonSign, todoList, openRow} = useStore();
  const selectedItemRef = useRef<ToDoListItem | null>(null);

  const onCloseModal = useCallback(() => {
    toDoListStore.setModalVisible = false;
    navigation.pop();
  }, [navigation]);

  const onDeleteItem = useCallback(
    function deleteItem(item: ToDoListItem) {
      const newToDoList = todoList.filter(
        (task: ToDoListItem) => task.uuid !== item.uuid,
      );
      toDoListStore.setItems = newToDoList;
    },
    [todoList],
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

  const onShowDeleteAlert = useCallback(
    (item: ToDoListItem) => {
      Alert.alert(
        ALERT_BUTTON_TITLE,
        ALERT_BUTTON_SUBTITLE,
        [
          {
            text: CANCEL_BUTTON,
            onPress: () => {
              toDoListStore.setOpenRow = item.uuid;
            },
          },
          {
            text: YES_BUTTON,
            onPress: () => {
              onDeleteItem(item);
            },
          },
        ],
        {cancelable: true},
      );
    },
    [onDeleteItem],
  );

  const onAddItem = useCallback(
    function onAddItem(itemText: string) {
      const newItem: ToDoListItem = {uuid: generateUniqueId(), text: itemText};
      todoList.unshift(newItem);
      toDoListStore.setItems = todoList;
      onCloseModal();
    },
    [onCloseModal, todoList],
  );

  const onEditItem = useCallback(
    function editItem(updatedText: string) {
      const index = todoList.findIndex(
        item => item.uuid === selectedItemRef.current?.uuid,
      );
      if (index !== -1) {
        todoList[index] = {...todoList[index], text: updatedText};
        toDoListStore.setItems = todoList;
        selectedItemRef.current = null;
        onCloseModal();
      }
    },
    [onCloseModal, todoList],
  );

  const onSelectItemToEdit = useCallback(
    function onSelectItemToEdit(selectedItem: ToDoListItem) {
      toDoListStore.setModalVisible = true;
      selectedItemRef.current = selectedItem;
      navigation.navigate('EditModal', {
        onPressConfirm: onEditItem,
        onPressCancel: onCloseModal,
        currentText: selectedItem.text,
      });
    },
    [navigation, onCloseModal, onEditItem],
  );

  const onSwipeRow = useCallback((uuid: string) => {
    toDoListStore.setOpenRow = uuid;
  }, []);

  const onPressFloatingButton = useCallback(() => {
    toDoListStore.setModalVisible = true;
    navigation.navigate('EditModal', {
      onPressConfirm: onAddItem,
      onPressCancel: onCloseModal,
      currentText: '',
    });
  }, [navigation, onAddItem, onCloseModal]);

  const enrichToDoListArray = useMemo(() => {
    return todoList.map(item => ({
      toDoListItem: item,
      deleteItem: () => onShowDeleteAlert(item),
      isOpen: openRow === item.uuid,
      onSwipe: () => onSwipeRow(item.uuid),
      onEditItem: () => onSelectItemToEdit(item),
    }));
  }, [onSelectItemToEdit, onShowDeleteAlert, onSwipeRow, openRow, todoList]);

  return {
    onPressLogout,
    onPressFloatingButton,
    enrichToDoListArray,
    floatingButtonSign,
  };
}
