import axios from 'axios';

export const RequestServer = axios.create({
  baseURL: "http://localhost:3000"
});

export const StoreageKeys={
  userInfo:"user_info"
}

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