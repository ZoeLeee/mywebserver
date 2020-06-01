import * as React from "react"
import { appStore } from './AppStore';
import Login from "./components/login";
import Home from "./components/home";
import { routes } from './router/index';
import { Route } from "react-router";


const App = () => {
  return (
    <>
      {
        routes.map(r => <Route exact={r.exact} path={r.path} component={r.component} />)
      }
    </>
  )
}

export default App;