import * as React from "react";
import { routes } from './router/index';
import { Route, Switch } from "react-router";


const App = () => {
  return (
    <Switch>
      {
        routes.map(r => <Route key={r.path} exact={r.exact} path={r.path} component={r.component} />)
      }
    </Switch>

  );
};

export default App;