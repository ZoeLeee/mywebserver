import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './index.less';
import { AppStore } from './../../AppStore';
import { useStores } from './../../utils/useStores';
import { ReqApi } from './../../utils/hosts';
import {  Post } from './../../utils/request';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
  const [uname,setUname]= useState("");
  const [pwd,setPwd]= useState("");
  const {store}=useStores() as Record<string,AppStore>;

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const changeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUname(e.currentTarget.value)
  }

  const changePwd=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPwd(e.currentTarget.value)
  }

  const login=async ()=>{
    let data=await Post(ReqApi.Login,{
      uname,
      pwd
    })
    if(data.code===0){
      localStorage.setItem('user_info',JSON.stringify(data.userInfo));
      store.isLogin=true;
      props.history.push("/");
    }
  }

  return (
    <div className="login">
      <div>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input value={uname} onChange={changeName} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={pwd} onChange={changePwd} />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={login}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default  Login;
