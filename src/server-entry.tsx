import React from 'react'
import App from './App';
import { Provider, useStaticRendering } from 'mobx-react';
import { StaticRouter, Switch } from 'react-router';
import { appStore } from './AppStore';

useStaticRendering(true)

const Com = (stores, routerContext = {}, url: string) => {
  return (
    <Provider store={stores}>
      <StaticRouter context={routerContext} location={url}>
        <Switch>
          <App />
        </Switch>
      </StaticRouter>
    </Provider>
  )
}

export default Com;

export {appStore}
