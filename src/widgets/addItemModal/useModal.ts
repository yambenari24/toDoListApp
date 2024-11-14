import {useCallback, useRef} from 'react';

export function useModal(
  onPress: (text: string) => void,
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
      const text = inputRef.current;
      if (text?.trim()) {
        onPress(text);
        closeModal();
      }
    },
    [closeModal, onPress],
  );

  return {inputRef, handleChangeText, handleAddItem};
}
