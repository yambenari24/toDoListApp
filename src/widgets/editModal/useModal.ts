import {useCallback, useRef} from 'react';
import {ADD_TITLE, EDIT_TITLE} from '../../screens/toDoList/constant';

export function useModal(
  onPress: (text: string) => void,
  closeModal: () => void,
  currentText: string,
) {
  const inputRef = useRef<string>(currentText);

  const handleChangeText = useCallback(
    (text: string) => {
      inputRef.current = text;
    },
    [inputRef],
  );

  const handleAddItem = useCallback(
    function addItemFunc() {
      const text = inputRef.current;
      if (text?.trim()) {
        onPress(text);
        closeModal();
      }
    },
    [closeModal, onPress],
  );

  const buttonTitle = currentText === '' ? ADD_TITLE : EDIT_TITLE;

  return {inputRef, handleChangeText, handleAddItem, buttonTitle};
}
