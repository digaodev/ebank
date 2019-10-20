/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { isSignedIn } = useAuth();

  console.log({ isSignedIn });

  if (!isSignedIn && isPrivate) {
    return <Redirect to="/" />;
  }

  if (isSignedIn && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
