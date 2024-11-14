import {useCallback, useMemo, useState} from 'react';
import {ToDoListItem} from './index';
import {Alert} from 'react-native';
import {
  ALERT_BUTTON_SUBTITLE,
  ALERT_BUTTON_TITLE,
  CANCEL_BUTTON,
  MINUS,
  PLUS,
  YES_BUTTON,
} from './constant';
import {generateUniqueId} from './utils';

export function useToDoList() {
  const [toDoListArray, setToDoListArray] = useState<ToDoListItem[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(function handleOpenModel() {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(function handleCloseModal() {
    setModalVisible(false);
  }, []);

  const onItemAdd = useCallback(
    function handleAddItem(text: string) {
      const copyToDoListArray = [...toDoListArray];
      const item: ToDoListItem = {text: text, uuid: generateUniqueId()};
      copyToDoListArray.unshift(item);
      setToDoListArray(copyToDoListArray);
    },
    [toDoListArray],
  );

  const onItemDelete = useCallback(
    function deleteItem(item: ToDoListItem) {
      const copyToDoListArray = [...toDoListArray];
      const indexToDelete = copyToDoListArray.findIndex(
        task => task.uuid === item.uuid,
      );
      if (indexToDelete !== -1) {
        copyToDoListArray.splice(indexToDelete, 1);
      }
      setToDoListArray(copyToDoListArray);
    },
    [toDoListArray],
  );

  const handleRowSwipe = useCallback((rowId: string) => {
    setOpenRow(rowId);
  }, []);

  const onShowDeleteAlert = useCallback(
    function handleDeleteItem(item: ToDoListItem) {
      Alert.alert(
        ALERT_BUTTON_TITLE,
        ALERT_BUTTON_SUBTITLE,
        [
          {
            text: CANCEL_BUTTON,
            onPress: () => {
              handleRowSwipe(item.uuid);
            },
          },
          {
            text: YES_BUTTON,
            onPress: () => {
              onItemDelete(item);
            },
          },
        ],
        {cancelable: true},
      );
    },
    [handleRowSwipe, onItemDelete],
  );

  const buttonState = useMemo(() => {
    return modalVisible ? MINUS : PLUS;
  }, [modalVisible]);

  const enrichToDoListArray = useMemo(() => {
    return toDoListArray.map(item => ({
      toDoListItem: item,
      deleteItem: () => onShowDeleteAlert(item),
      isOpen: openRow === item.uuid,
      onSwipe: () => handleRowSwipe(item.uuid),
    }));
  }, [handleRowSwipe, onShowDeleteAlert, openRow, toDoListArray]);

  return {
    openModal,
    closeModal,
    modalVisible,
    toDoListArray,
    onItemAdd,
    onShowDeleteAlert,
    openRow,
    handleRowSwipe,
    buttonState,
    enrichToDoListArray,
  };
}
