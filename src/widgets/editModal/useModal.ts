import {useCallback, useMemo, useRef} from 'react';
import {ADD_TITLE, EDIT_TITLE} from '../../screens/toDoList/constant';
import {EditModalProps} from './types';

export function useModal(props: EditModalProps) {
  const inputRef = useRef<string>(props.currentText);

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
        props.onPress(text);
        props.closeModal();
      }
    },
    [props],
  );

  const buttonTitle = useMemo(() => {
    return props.currentText === '' ? ADD_TITLE : EDIT_TITLE;
  }, [props]);

  return {inputRef, handleChangeText, handleAddItem, buttonTitle};
}
