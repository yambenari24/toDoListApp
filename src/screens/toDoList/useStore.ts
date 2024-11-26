import {useState, useEffect} from 'react';
import {reaction} from 'mobx';
import {toDoListStore} from '../../store/toDoListStore';
import {PLUS} from './constant';

const useStore = () => {
  const [floatingButtonSign, setFloatingButtonSign] = useState(PLUS);
  const [todoList, setTodoList] = useState(toDoListStore.items);
  const [openRow, setOpenRow] = useState(toDoListStore.openRow);

  // const [openRow, setOpenRow] = useState<string | null>(null);
  // const [modalVisible, setModalVisible] = useState(false);
  // const selectedItemRef = useRef<ToDoListItem | null>(null);
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

    return () => {
      disposeFloatingButton();
      disposeTodoList();
      disposeOpenRow();
    };
  }, []);

  return {floatingButtonSign, todoList, openRow};
};
export default useStore;
