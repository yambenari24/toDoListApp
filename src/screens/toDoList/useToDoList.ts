import {useCallback, useMemo, useState} from 'react';
import {ToDoListItemProps} from './index';
import {Alert} from 'react-native';
import {
  ALERT_BUTTON_SUBTITLE,
  ALERT_BUTTON_TITLE,
  CANCEL_BUTTON,
  MINUS,
  PLUS,
  YES_BUTTON,
} from './constant';

export function useToDoList() {
  const [toDoListArray, setToDoListArray] = useState<ToDoListItemProps[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(function handleOpenModel() {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(function handleCloseModal() {
    setModalVisible(false);
  }, []);

  const handleAddItem = useCallback(
    function handleAddItem(item: ToDoListItemProps) {
      const copyToDoListArray = [...toDoListArray];
      copyToDoListArray.unshift(item);
      setToDoListArray(copyToDoListArray);
    },
    [toDoListArray],
  );

  const deleteItem = useCallback(
    function deleteItem(item: ToDoListItemProps) {
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

  const handleRowSwipe = useCallback(
    (rowId: string) => {
      setOpenRow(openRow === rowId ? null : rowId);
    },
    [openRow],
  );

  const handleDeleteItem = useCallback(
    function handleDeleteItem(item: ToDoListItemProps) {
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
              deleteItem(item);
            },
          },
        ],
        {cancelable: true},
      );
    },
    [deleteItem, handleRowSwipe],
  );

  const buttonState = useMemo(() => {
    return modalVisible ? MINUS : PLUS;
  }, [modalVisible]);

  return {
    openModal,
    closeModal,
    modalVisible,
    toDoListArray,
    handleAddItem,
    handleDeleteItem,
    openRow,
    handleRowSwipe,
    buttonState,
  };
}
