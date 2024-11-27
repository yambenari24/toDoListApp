import {makeAutoObservable} from 'mobx';

class UserStore {
  private userToken: string | null = null;
  private username: string = '';
  private password: string = '';

  constructor() {
    makeAutoObservable(this);
  }
  get token(): string | null {
    return this.userToken;
  }

  get userName(): string {
    return this.username;
  }

  get userPassword(): string {
    return this.password;
  }

  set setUserToken(token: string | null) {
    this.userToken = token;
  }

  set setUserName(username: string) {
    this.username = username;
  }

  set setPassword(password: string) {
    this.password = password;
  }
}

export const userStore = new UserStore();
