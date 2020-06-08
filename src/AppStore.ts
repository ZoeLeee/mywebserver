import { observable } from "mobx";
import { StoreageKeys } from "./utils/request";

export class AppStore {
  @observable isLogin = false;
  userInfo = { avatar: "http://cdn2.dodream.top/ava1.jpg?key=joelee",uname:"" };
  constructor() {
    if (typeof window !== 'undefined') {
      const info = localStorage.getItem(StoreageKeys.userInfo);
      this.isLogin = !!info && info !== "undefined";
      if (this.isLogin ) {
        Object.assign(this.userInfo, JSON.parse(info));
      }
    }
  }
}

export const appStore = new AppStore();