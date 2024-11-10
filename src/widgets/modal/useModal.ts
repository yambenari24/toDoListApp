import {useCallback, useRef} from 'react';
import {generateUniqueId} from '../../screens/toDoList/utils';
import {ToDoListItemProps} from '../../screens/toDoList';

export function useModal(
  addItem: (item: ToDoListItemProps) => void,
  closeModal: () => void,
) {
  const inputRef = useRef<string>('');

  const handleChangeText = useCallback(
    (text: string) => {
      inputRef.current = text;
    },
    [inputRef],
  );

  const handleAddItem = useCallback(
    function addItemFunc() {
      const task = inputRef.current;
      if (task?.trim()) {
        addItem({text: task, uuid: generateUniqueId()});
        closeModal();
      }
    },
    [addItem, closeModal, inputRef],
  );

  return {inputRef, handleChangeText, handleAddItem};
}
