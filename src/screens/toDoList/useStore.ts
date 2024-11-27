import {useState, useEffect} from 'react';
import {reaction} from 'mobx';
import {toDoListStore} from '../../store/toDoListStore';
import {PLUS} from './constant';

export const useStore = () => {
  const [floatingButtonSign, setFloatingButtonSign] = useState(PLUS);
  const [todoList, setTodoList] = useState(toDoListStore.items);
  const [openRow, setOpenRow] = useState(toDoListStore.openRow);
  const [modalVisible, setModalVisible] = useState(
    toDoListStore.isModalVisible,
  );

  useEffect(() => {
    const disposeTodoList = reaction(
      () => toDoListStore.items,
      newTodoList => setTodoList(newTodoList),
    );
    const disposeFloatingButton = reaction(
      () => toDoListStore.floatingButtonState,
      newSign => setFloatingButtonSign(newSign),
    );

    const disposeOpenRow = reaction(
      () => toDoListStore.openRow,
      newOpenRow => setOpenRow(newOpenRow),
    );

    const disposeModalVisible = reaction(
      () => toDoListStore.isModalVisible,
      newModalVisible => setModalVisible(newModalVisible),
    );

    return () => {
      disposeFloatingButton();
      disposeTodoList();
      disposeOpenRow();
      disposeModalVisible();
    };
  }, []);

  return {floatingButtonSign, todoList, openRow, modalVisible};
};
