import { observable } from "mobx";

export class AppStore {
  @observable isLogin = false
  constructor() {
    if (typeof window !== 'undefined')
      this.isLogin = !!localStorage.getItem('user_info');
  }
}

export const appStore = new AppStore();