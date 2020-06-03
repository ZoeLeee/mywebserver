import { observable } from "mobx";

class AppStore{
  @observable isLogin:false
} 

export const appStore=new AppStore();