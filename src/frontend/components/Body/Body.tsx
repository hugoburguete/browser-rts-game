import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FourOhFour } from '../../pages/404/404';
import { About } from '../../pages/About/About';
import { Homepage } from '../../pages/Homepage/Homepage';
import { PrivateRoute, PrivateRouteProps } from '../PrivateRoute/PrivateRoute';
import { useAuth } from '../ProvideAuth/ProvideAuth';

const Body = () => {
  const auth = useAuth();
  const defaultPivateRouteProps: PrivateRouteProps = {
    isAuthenticated: auth.user !== '',
    authenticationPath: '/',
  };

  return (
    <div className="App">
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <PrivateRoute {...defaultPivateRouteProps} exact={true} path="/about">
          <About />
        </PrivateRoute>
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
