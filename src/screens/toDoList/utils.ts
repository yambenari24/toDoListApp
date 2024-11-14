import {FlatListToDoListProps} from './components';

export const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

export const getUUIid = (item: FlatListToDoListProps) => {
  return item.toDoListItem.uuid;
};
