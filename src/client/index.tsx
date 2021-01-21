import * as ReactDOM from "react-dom";
import * as React from "react";
import './style.less';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'mobx-react';
import { Switch } from "react-router";
import { appStore } from './AppStore';


ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById("app"));