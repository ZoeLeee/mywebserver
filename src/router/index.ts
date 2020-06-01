import Home from './../components/home/index';
import Login from './../components/login/index';

interface IRouter{
  path:string;
  exact:boolean;
  component:()=>JSX.Element;
}

export const routes:IRouter[] = [
  {
      path: "/",
      exact: true,
      component: Home
  },
  {
      path: '/login', 
      exact: true,
      component:Login,
  },
];