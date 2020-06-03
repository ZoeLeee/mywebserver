import * as React from "react"
import { routes } from './router/index';
import { Route } from "react-router";


const App = () => {
  return (
    <>
      {
        routes.map(r => <Route key={r.path} exact={r.exact} path={r.path} component={r.component} />)
      }
    </>
  )
}

export default App;