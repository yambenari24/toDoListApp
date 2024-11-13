import {ToDoListItem} from '../types';

export type ToDoListRowProps = {
  toDoListItem: ToDoListItem;
  deleteItem: () => void;
  isOpen: boolean;
  onSwipe: () => void;
  onEditItem: () => void;
};
