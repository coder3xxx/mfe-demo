import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Landing from '../pages/Landing';
import Pricing from '../pages/Pricing';
import Edit from '../pages/Edit';
import { useStore } from '../store';

export default ({ history }) => {
  const { isAuth } = useStore();

  const renderFallback = () => {
    return <div>Loading...</div>
  }

  return (
    <Router history={history}>
      <Suspense fallback={renderFallback}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <PrivateRoute path="/edit" component={Edit} isAuth={isAuth} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Suspense>
    </Router>
  )
}