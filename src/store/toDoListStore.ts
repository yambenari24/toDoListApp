import {makeAutoObservable} from 'mobx';
import {ToDoListItem} from '../screens/toDoList';
import {MINUS, PLUS} from '../screens/toDoList/constant';

class ToDoListStore {
  private todoListItems: ToDoListItem[] = [];
  private currentOpenRow: string | null = null;
  private modalVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isModalVisible() {
    return this.modalVisible;
  }

  get floatingButtonState() {
    return this.modalVisible ? MINUS : PLUS;
  }

  get items(): ToDoListItem[] {
    return this.todoListItems;
  }

  get openRow(): string | null {
    return this.currentOpenRow;
  }

  set setItems(list: ToDoListItem[]) {
    this.todoListItems = [...list];
  }

  set setModalVisible(isVisible: boolean) {
    this.modalVisible = isVisible;
  }

  set setOpenRow(rowId: string | null) {
    this.currentOpenRow = rowId;
  }
}

export const toDoListStore = new ToDoListStore();
