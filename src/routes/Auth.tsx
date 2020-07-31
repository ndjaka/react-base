import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SplashScreen } from 'components';
import SecureLS from 'secure-ls';
import { loginSuccess, setTranslationFunction } from 'store/actions';
import { getUserInfo } from 'store/effects';
import { useTranslation } from 'react-i18next';

const ls = new SecureLS({ encodingType: 'aes' });

function Auth(props: any) {
  const { children } = props;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setTranslationFunction(t));
    const initAuth = async () => {
      try {
        let token = ls.get('token');
        let user = ls.get('user');
        if (user && token) {
          await dispatch(loginSuccess(user, token));
          // get new user profil on server
          dispatch(getUserInfo(user, token));
        }
      } catch (error) {}
      setLoading(false);
    };

    initAuth();
  }, [dispatch, t]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

export default Auth;
