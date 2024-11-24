import {useRef} from 'react';
import {ADD_TITLE, EDIT_TITLE} from '../../screens/toDoList/constant';
import {EditModalNavigationProp} from '../../navigation';
import {toDoListStore} from '../../store/toDoListStore';

export function useModal(navigation: EditModalNavigationProp) {
  const inputRef = useRef<string>(toDoListStore.selectedItem?.text ?? '');
  const closeModal = () => {
    navigation.pop();
  };

  const onAddItem = () => {
    toDoListStore.addItem(inputRef.current);
    toDoListStore.closeModal();
    closeModal();
  };

  const onEditModal = () => {
    if (inputRef.current.trim()) {
      toDoListStore.editItem({
        ...toDoListStore.selectedItem!,
        text: inputRef.current,
      });
    }
    toDoListStore.closeModal();
    closeModal();
  };

  const onHandleChangeText = (text: string) => {
    inputRef.current = text;
  };

  const onPressModal = () => {
    return toDoListStore.selectedItem === null ||
      toDoListStore.selectedItem?.text === ''
      ? onAddItem()
      : onEditModal();
  };

  const buttonTitle = () => {
    const currentItemText = toDoListStore.selectedItem?.text;
    if (currentItemText === null || currentItemText === '') {
      return ADD_TITLE;
    } else {
      return EDIT_TITLE;
    }
  };

  return {
    closeModal,
    inputRef,
    onHandleChangeText,
    buttonTitle,
    onPressModal,
  };
}
