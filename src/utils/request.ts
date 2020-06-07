import axios from 'axios';

export const RequestServer = axios.create({
  baseURL:"http://localhost:3000"
});

export async function Post(url:string,data:any){
  let res=await RequestServer.post(url,data);
  return res.data;
}