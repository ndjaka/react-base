import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from 'store/types';

function GuestGuard(props: any) {
  const { children } = props;
  const account = useSelector((state: ApplicationState) => state.account);

  if (account.user) {
    return <Redirect to="/home/article" />;
  }

  return children;
}

export default GuestGuard;
