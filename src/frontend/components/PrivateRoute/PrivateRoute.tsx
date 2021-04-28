import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

export function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}: PrivateRouteProps) {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
}
