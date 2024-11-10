import {ToDoListRowProps} from './components';

export const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

export const getUUIid = (item: ToDoListRowProps) => {
  return item.toDoListItem.uuid;
};
