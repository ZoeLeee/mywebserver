import axios from 'axios';

export const HOST = "http://localhost:3000/api/";
export const CURRENT_HOST = "https://www.dodream.wang/api/";

function getHost() {
  if (typeof window === "undefined")
    return CURRENT_HOST;
  else
    return location?.host?.includes("localhost") ? HOST : CURRENT_HOST;
}

export const RequestServer = axios.create({
  baseURL: getHost()
});

export const StoreageKeys = {
  userInfo: "user_info"
};

export enum RequestStatus {
  Ok = 0,
  Err = -1,
  Other = 1,
}

export interface IReqResult {
  code: RequestStatus,
  data: any;
}


export async function Post(url: string, data: any): Promise<IReqResult> {
  let res = await RequestServer.post(url, data);
  return res.data;
}

export async function Get(url: string): Promise<IReqResult> {
  let res = await RequestServer.get(url);
  return res.data;
}
export async function DeleteReq(url: string, data: any): Promise<IReqResult> {
  let res = await RequestServer.delete(url, { data: { data } });
  return res.data;
}