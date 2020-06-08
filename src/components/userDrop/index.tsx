import React from 'react'
import { Menu,  Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, SecurityScanOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons';
import { useStores } from './../../utils/useStores';
import {  Get, RequestStatus, StoreageKeys } from '../../utils/request';
import { ReqApi } from '../../utils/hosts';

const Icon_Style = {
  marginRight: 8
}

const UserDrop = (props) => {

  const { store } = useStores();

  const logout = async () => {
    let data = await Get(ReqApi.LoginOut);
    if (data.code === RequestStatus.Ok) {
      store.isLogin = false;
      localStorage.removeItem(StoreageKeys.userInfo);
      props.history.push('/login');
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/setting/basic">
          <UserOutlined style={Icon_Style} />
          User Center
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/setting/security">
          <SecurityScanOutlined style={Icon_Style} />
          Security Center
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/setting/global">
          <SettingOutlined style={Icon_Style} />
          Global Setting
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        <LoginOutlined style={{ marginRight: 10 }} />
        登出
      </Menu.Item>
    </Menu>
  );
  const userInfoStore = store.userInfo;
  return (
    <section className="server_status_wrapper">
      <Dropdown overlay={menu}>
        <span>
          <Avatar
            size="small"
            icon={<UserOutlined />}
            src={userInfoStore.avatar}
            style={{ marginRight: 8 }}
          />
          {userInfoStore.uname}
        </span>
      </Dropdown>
    </section>
  );
}

export default UserDrop
