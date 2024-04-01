import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from './store';
import AppRouter from './route';

const generateClassName = createGenerateClassName({
  productionPrefix: 'auth',
});

export default ({ history }) => {
  const { setUserInfo } = useStore();

  useEffect(() => {
    // Listener login event from container
    const listenerAuthorizationW = ({ detail }) => {
      setUserInfo(detail);
    }

    window.addEventListener('AUTHORIZATION_TO_SUB_APP', listenerAuthorizationW);

    return () => {
      window.removeEventListener('AUTHORIZATION_TO_SUB_APP', listenerAuthorizationW);
    }
  }, []);

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <AppRouter history={history} />
      </StylesProvider>
      <ToastContainer />
    </div>
  );
};
