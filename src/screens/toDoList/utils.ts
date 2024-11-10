import {ToDoListItem} from './types';

export const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

export const getUUIid = (item: ToDoListItem) => {
  return item.uuid;
};
