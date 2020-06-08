import Home from './../components/home/index';
import Login from './../components/login/index';
import Overview from '../components/verview';
import Articles from '../containers/articles';
import AddArticles from './../components/addArticles/index';

interface IRouter{
  path:string;
  exact:boolean;
  component:(...args)=>JSX.Element;
}

export const routes:IRouter[] = [
  {
      path: "/",
      exact: false,
      component: Home
  },
  {
      path: '/login', 
      exact: true,
      component:Login,
  },
];

export const ContentRoutes:IRouter[]=[
  {
    path: "/",
    exact: true,
    component: Overview
  },
  {
    path: "/article/add",
    exact: true,
    component: AddArticles
  },
  {
    path: "/article/update/:id",
    exact: true,
    component: AddArticles
  },
  {
    path: "/articles",
    exact: true,
    component: Articles
  },
]