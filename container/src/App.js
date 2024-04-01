import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import DashboardApp from './sub-projects/DashboardApp';
import AuthApp from './sub-projects/AuthApp';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import jwtDecode from "jwt-decode";
import cookies from 'js-cookie';
import { useStore } from './store';
import { crossLoginToSubApp } from './helpers/login';
import { debounce, delay } from 'lodash';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const { setUserInfo, userInfo } = useStore();

  useEffect(() => {
    const token = cookies.get('token');

    const decodeInfo = token ? jwtDecode(token) : {};

    setUserInfo(decodeInfo);
    delay(() => crossLoginToSubApp(decodeInfo), 0);
  }, []);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <AuthApp />
          <DashboardApp />
          {/* <NotFound /> */}
          <Footer />
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
