import client from './client';

export const addBookmark = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/bookmark`).then((res) => res.data);
};

export const removeBookmark = (articleId: number): Promise<unknown> => {
  return client
    .delete(`articles/${articleId}/bookmark`)
    .then((res) => res.data);
};
