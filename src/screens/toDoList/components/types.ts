import {ToDoListItem} from '../types';

export type ToDoListRowProps = {
  key: string;
  toDoListItem: ToDoListItem;
  deleteItem: () => void;
  isOpen: boolean;
  onSwipe: () => void;
};

export type FlatListToDoListProps = {
  toDoListItem: ToDoListItem;
  deleteItem: () => void;
  isOpen: boolean;
  onSwipe: () => void;
};
