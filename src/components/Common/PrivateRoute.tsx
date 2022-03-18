import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AUTHEN_KEY } from '../../constants';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
  // check logged user
  const isLogged = localStorage.getItem(AUTHEN_KEY);

  if (!isLogged) return <Redirect to="/login" />;

  return <Route {...props} />;
}
