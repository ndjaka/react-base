import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from 'store/types';

function AuthGuard(props: any) {
  const { children } = props;
  const account = useSelector((state: ApplicationState) => state.account);

  if (!account.user) {
    return <Redirect to="/auth/login" />;
  }

  return children;
}

export default AuthGuard;
