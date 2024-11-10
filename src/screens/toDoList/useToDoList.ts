import {useCallback, useState} from 'react';
import {ToDoListItem} from './index';
import {Alert} from 'react-native';
import {
  ALERT_BUTTON_SUBTITLE,
  ALERT_BUTTON_TITLE,
  CANCEL_BUTTON,
  YES_BUTTON,
} from './constant';
import {generateUniqueId} from './utils';

export function useToDoList() {
  const [toDoListArray, setToDoListArray] = useState<ToDoListItem[]>([]);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const handleAddItem = useCallback(
    function handleAddItem(item: ToDoListItem) {
      const copyToDoListArray = [...toDoListArray];
      item.uuid = generateUniqueId();
      copyToDoListArray.unshift(item);
      setToDoListArray(copyToDoListArray);
    },
    [toDoListArray],
  );

  const deleteItem = useCallback(
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

  const handleRowSwipe = useCallback(
    (rowId: string) => {
      setOpenRow(openRow === rowId ? null : rowId);
    },
    [openRow],
  );

  const handleDeleteItem = useCallback(
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
              deleteItem(item);
            },
          },
        ],
        {cancelable: true},
      );
    },
    [deleteItem, handleRowSwipe],
  );
  return {
    toDoListArray,
    handleAddItem,
    handleDeleteItem,
    openRow,
    handleRowSwipe,
  };
}
