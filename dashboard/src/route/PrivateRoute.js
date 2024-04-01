import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ path, component: Component, exact = false, isAuth }) => {
  return (
    <Route exact={exact} path={path} render={props =>
      isAuth ? <Component {...props} /> : <Redirect to="/login" />
    } />
  )
}