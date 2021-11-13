import client from './client';

export const addBookmark = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/bookmark`).then((res) => res.data);
};

export const removeBookmark = (articleId: number): Promise<unknown> => {
  return client
    .delete(`articles/${articleId}/bookmark`)
    .then((res) => res.data);
};

export const addUpvote = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/upvote`).then((res) => res.data);
};

export const removeUpvote = (articleId: number): Promise<unknown> => {
  return client.delete(`articles/${articleId}/upvote`).then((res) => res.data);
};

export const trackView = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/view`).then((res) => res.data);
};
