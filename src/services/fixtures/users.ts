import { User } from 'store/types';

interface AuthResults {
  Authorization: string;
  message: string;
  email: string;
  password: string;
  user: User;
}

export const auth_users: AuthResults[] = [
  {
    Authorization: 'Token',
    message: 'Connexion reussi',
    email: 'admin@test.com',
    password: 'password',
    user: { name: 'Kevin', age: 12 }
  }
];

export const list_users: User[] = [
  { name: 'Kevin', age: 12 },
  { name: 'Joel', age: 34 },
  { name: 'Bryan', age: 55 },
  { name: 'Thor', age: 89 },
  { name: 'Jonathan', age: 22 }
];

export const connected_user: User = {
  name: 'Kevin',
  age: 12
};
