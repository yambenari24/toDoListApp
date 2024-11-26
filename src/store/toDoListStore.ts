import {makeAutoObservable} from 'mobx';
import {ToDoListItem} from '../screens/toDoList';
import {generateUniqueId} from '../screens/toDoList/utils';
import {
  ALERT_BUTTON_SUBTITLE,
  ALERT_BUTTON_TITLE,
  CANCEL_BUTTON,
  MINUS,
  PLUS,
  YES_BUTTON,
} from '../screens/toDoList/constant';
import {Alert} from 'react-native';

class ToDoListStore {
  items: ToDoListItem[] = [];
  selectedItem: ToDoListItem | null = null;
  openRow: string | null = null;
  modalVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addItem(itemText: string) {
    const newItem: ToDoListItem = {uuid: generateUniqueId(), text: itemText};
    this.items.unshift(newItem);
    this.closeModal();
  }

  deleteItem(item: ToDoListItem) {
    this.items = this.items.filter(task => task.uuid !== item.uuid);
    this.closeModal();
  }

  setCurrentItem(item: ToDoListItem) {
    this.selectedItem = item;
  }

  clearCurrentItem() {
    this.selectedItem = null;
  }

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.selectedItem = null;
  }

  setOpenRow(rowId: string) {
    this.openRow = rowId;
  }

  editItem(item: ToDoListItem) {
    this.setCurrentItem(item);
    const index = this.items.findIndex(
      element => element.uuid === this.selectedItem?.uuid,
    );
    if (index !== -1) {
      this.items[index] = {...this.items[index], text: item.text};
    }
  }

  selectItem(item: ToDoListItem) {
    this.selectedItem = item;
  }

  onShowDeleteAlert(item: ToDoListItem) {
    Alert.alert(
      ALERT_BUTTON_TITLE,
      ALERT_BUTTON_SUBTITLE,
      [
        {
          text: CANCEL_BUTTON,
          onPress: () => {
            this.setOpenRow(item.uuid);
          },
        },
        {
          text: YES_BUTTON,
          onPress: () => {
            this.deleteItem(item);
          },
        },
      ],
      {cancelable: true},
    );
  }

  get floatingButtonState() {
    return this.modalVisible ? MINUS : PLUS;
  }
}

export const toDoListStore = new ToDoListStore();
