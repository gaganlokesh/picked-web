import client from './client';

export const followSource = (slug: string): Promise<unknown> => {
  return client.post(`sources/${slug}/follow`).then((res) => res.data);
};

export const unfollowSource = (slug: string): Promise<unknown> => {
  return client.post(`sources/${slug}/unfollow`).then((res) => res.data);
};
