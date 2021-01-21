import React from 'react';
import App from '../client/App';
import { Provider, useStaticRendering } from 'mobx-react';
import { StaticRouter } from 'react-router';
import { appStore } from '../client/AppStore';

useStaticRendering(true);

const Com = (stores, routerContext = {}, url: string) => {
  return (
    <Provider store={stores}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider >
  );
};

export default Com;

export { appStore };
