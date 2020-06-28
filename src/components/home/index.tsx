import React, { useState } from "react"
import { Layout, Menu, Breadcrumb } from 'antd';
import  {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { observer } from "mobx-react";
import { AppStore } from './../../AppStore';
import { Redirect, Switch, Route, RouteComponentProps } from "react-router";
import { useStores } from './../../utils/useStores';
import { ContentRoutes } from "../../router";
import { Link } from "react-router-dom";
import UserDrop from './../userDrop/index';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = (props:RouteComponentProps) => {

  const [collapsed, setCollapsed] = useState(false);
  const { store } = useStores() as Record<string, AppStore>;

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (!store.isLogin) {
    return (<Redirect to='/login' />)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo" >Do</div>
        <Menu theme="dark" defaultSelectedKeys={[props.location.pathname]} mode="inline">
          <Menu.Item key="/" icon={<PieChartOutlined />}>
            <Link to="/">概览</Link>
          </Menu.Item>
          <Menu.Item key="/articles" icon={<DesktopOutlined />}>
            <Link to="/articles/list">文章管理</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          {
            collapsed?
              <MenuUnfoldOutlined className="trigger" onClick={onCollapse} />:
              <MenuFoldOutlined  className="trigger" onClick={onCollapse} />
          }
          <div className="global_config">
            <span className="config_item">
              <UserDrop />
            </span>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              {
                ContentRoutes.map(r => <Route key={r.path} exact={r.exact} path={r.path} component={r.component} />)
              }
              <Redirect from="/articles" to="/articles/list" />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default observer(Home);