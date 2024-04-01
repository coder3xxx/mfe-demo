import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (el, { onNavigate, defaultHistory } = {}) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    // Listen to update path to BrowserRouter
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    // callback update path from container
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  }
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#dashboard-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
