import React, { useEffect } from 'react';
import './App.scss';
import Loading from './components/Loading/Loading';
import { Switch, Route } from 'react-router-dom';
import { FourOhFour } from './pages/404/404';
import { About } from './pages/About/About';
import { Homepage } from './pages/Homepage/Homepage';
import { Overview } from './pages/Overview/Overview';
import {
  PrivateRoute,
  PrivateRouteProps,
} from './components/PrivateRoute/PrivateRoute';
import { useAuth } from './components/ProvideAuth/ProvideAuth';
import { ProvideVillage } from './hooks/useVillage';

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.loadUser();
  }, []);

  if (auth.isUserLoading) {
    return <Loading />;
  }

  const defaultPivateRouteProps: PrivateRouteProps = {
    isAuthenticated: auth.user !== '',
    authenticationPath: '/',
    exact: true,
  };

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <PrivateRoute {...defaultPivateRouteProps} path="/about">
          <About />
        </PrivateRoute>
        <PrivateRoute {...defaultPivateRouteProps} path="/overview">
          <ProvideVillage>
            <Overview />
          </ProvideVillage>
        </PrivateRoute>
        <Route path="*">
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
