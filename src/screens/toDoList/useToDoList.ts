import {useCallback, useMemo, useRef, useState} from 'react';
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
  const selectedItemRef = useRef<ToDoListItem | null>(null);

  const openModal = useCallback(function handleOpenModel() {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(function handleCloseModal() {
    setModalVisible(false);
    selectedItemRef.current = null;
  }, []);

  const onItemAdd = useCallback(
    function handleAddItem(text: string) {
      const copyToDoListArray = [...toDoListArray];
      const item: ToDoListItem = {text: text, uuid: generateUniqueId()};
      copyToDoListArray.unshift(item);
      setToDoListArray(copyToDoListArray);
      selectedItemRef.current = null;
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
      selectedItemRef.current = null;
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

  function onEditItem(item: ToDoListItem) {
    setModalVisible(true);
    selectedItemRef.current = item;
  }

  const handleEditItem = useCallback(
    function handleEditItem(newText: string) {
      if (!selectedItemRef.current) {
        return;
      }

      const copyArray = [...toDoListArray];
      const indexToEdit = copyArray.findIndex(
        task => task.uuid === selectedItemRef.current?.uuid,
      );

      if (indexToEdit !== -1) {
        copyArray[indexToEdit] = {
          ...copyArray[indexToEdit],
          text: newText,
        };
        setToDoListArray(copyArray);
        selectedItemRef.current = null;
      }
    },
    [toDoListArray],
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
      onEditItem: () => onEditItem(item),
    }));
  }, [handleRowSwipe, onShowDeleteAlert, openRow, toDoListArray]);

  const onPressModal = useMemo(() => {
    return selectedItemRef.current === null ||
      selectedItemRef.current?.text === ''
      ? onItemAdd
      : handleEditItem;
  }, [handleEditItem, onItemAdd]);

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
    onEditItem,
    selectedItemRef,
    handleEditItem,
    onPressModal,
  };
}
