import { User } from '../types/user';
import client from './client';

export const getLoggedInUser = (): Promise<User> => {
  return client.get('users/me').then((res) => {
    return res.data;
  });
};

export const validateUsername = (
  username: string
): Promise<{
  valid: boolean;
  message?: string;
}> => {
  return client
    .get('users/validate_username', { params: { username } })
    .then((res) => {
      return res.data;
    });
};

export const updateUser = (id: number, data: {}): Promise<User> => {
  return client.patch(`users/${id}`, data).then((res) => {
    return res.data;
  });
};
