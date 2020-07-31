import { mocked } from 'utils';
import { auth_users } from 'services/fixtures';

export const login_mock = (info: any) => {
  const { email, password } = info;
  let auth_user = auth_users.find(
    (auth_user) => auth_user.email === email && auth_user.password === password
  );
  return auth_user
    ? mocked(200, {
        Authorization: auth_user.Authorization,
        user: auth_user.user,
        message: auth_user.message
      })
    : mocked(401, { message: 'Email ou mot de passe invalide!' });
};
