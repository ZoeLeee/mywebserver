import Home from '../components/home/index';
import Login from '../components/login/index';
import Overview from '../components/verview';
import Articles from '../containers/articles';
import loadable from '@loadable/component';
import React from 'react';

const AddArticles = loadable(() => import('../components/addArticles/index'), { ssr: true });
import Projects from '../containers/projects/index';
import { Category } from '../components/category/index';
import AddProject from '../components/addProject';

interface IRouter {
  path: string;
  exact: boolean;
  component: (...args) => JSX.Element;
}

export const routes: IRouter[] = [
  {
    path: "/",
    exact: false,
    component: (props) => <Home {...props} />
  },
  {
    path: '/login',
    exact: true,
    component: (props) => <Login {...props} />,
  },
];

export const ContentRoutes: IRouter[] = [
  {
    path: "/article/add",
    exact: true,
    component: (props) => <AddArticles {...props} title="添加文章" />
  },
  {
    path: "/projects/add",
    exact: true,
    component: (props) => <AddProject {...props} title="添加项目" />
  },
  {
    path: "/article/update/:id",
    exact: true,
    component: (props) => <AddArticles {...props} />
  },
  {
    path: "/articles/list",
    exact: true,
    component: (props) => <Articles {...props} />
  },
  {
    path: "/projects/list",
    exact: true,
    component: (props) => <Projects {...props} />
  },
  {
    path: "/projects/category",
    exact: true,
    component: (props) => <Category {...props} />
  },
  {
    path: "/project/update/:id",
    exact: true,
    component: (props) => <AddProject {...props} title="编辑项目" />
  },
  {
    path: "/",
    exact: true,
    component: (props) => <Overview {...props} />
  },
];