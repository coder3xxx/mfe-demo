import React from 'react';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useStore } from './store';
import { isEmpty } from 'lodash';
import AppRouter from './route';

export default ({ history }) => {
  const { setUserInfo, setIsAuth } = useStore();

  const generateClassName = createGenerateClassName({
    productionPrefix: 'dash',
  });

  useEffect(() => {
    // Listener login event from container
    const listenerAuthorization = ({ detail }) => {
      setUserInfo(detail);
      setIsAuth(!isEmpty(detail));
    }

    window.addEventListener('AUTHORIZATION_TO_SUB_APP', listenerAuthorization);

    return () => {
      window.removeEventListener('AUTHORIZATION_TO_SUB_APP', listenerAuthorization);
    }
  }, []);

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <AppRouter history={history} />
      </StylesProvider>
    </div>
  );
};
