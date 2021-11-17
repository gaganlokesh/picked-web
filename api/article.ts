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

export const trackArticleView = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/view`).then((res) => res.data);
};

export const hideArticle = (articleId: number): Promise<unknown> => {
  return client.post(`articles/${articleId}/hide`).then((res) => res.data);
};

export const reportArticle = (
  articleId: number,
  report: { category: string; reason: string }
): Promise<unknown> => {
  return client
    .post(`articles/${articleId}/report`, {
      ...report,
      reportable_type: 'Article',
      reportable_id: articleId,
    })
    .then((res) => res.data);
};
