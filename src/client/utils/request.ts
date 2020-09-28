import axios from 'axios';

export const HOST = "http://localhost:3000";
export const CURRENT_HOST = "https://www.dodream.wang/api/";
export const RequestServer = axios.create({
  baseURL: CURRENT_HOST
});

export const StoreageKeys = {
  userInfo: "user_info"
};

export enum RequestStatus {
  Ok = 0,
  Err = -1,
  Other = 1,
}

export async function Post(url: string, data: any) {
  let res = await RequestServer.post(url, data);
  return res.data;
}

export async function Get(url: string) {
  let res = await RequestServer.get(url);
  return res.data;
}
export async function DeleteReq(url: string, data: any) {
  let res = await RequestServer.delete(url, { data: { data } });
  return res.data;
}