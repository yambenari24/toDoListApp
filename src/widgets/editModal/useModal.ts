import {useCallback, useMemo, useRef} from 'react';
import {ADD_TITLE, EDIT_TITLE} from '../../screens/toDoList/constant';

export function useModal(
  currentText: string,
  onPress: (text: string) => void,
  onPressCancel: () => void,
) {
  const inputRef = useRef<string>(currentText);

  const closeModal = useCallback(() => {
    onPressCancel();
  }, [onPressCancel]);

  const onHandleChangeText = useCallback(
    (text: string) => {
      inputRef.current = text;
    },
    [inputRef],
  );

  const onPressButton = useCallback(() => {
    onPress(inputRef.current);
  }, [onPress]);

  const buttonTitle = useMemo(() => {
    return currentText === '' ? ADD_TITLE : EDIT_TITLE;
  }, [currentText]);

  return {
    closeModal,
    inputRef,
    onHandleChangeText,
    buttonTitle,
    onPressButton,
  };
}
