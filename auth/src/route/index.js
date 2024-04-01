import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import SingUp from '../pages/SingUp';
import Login from '../pages/Login';

export default ({ history }) => {
  const renderFallback = () => {
    return <div>Loading...</div>
  }

  return (
    <Router history={history}>
      <Suspense fallback={renderFallback}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SingUp} />
        </Switch>
      </Suspense>
    </Router>
  )
}