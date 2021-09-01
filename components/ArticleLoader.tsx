import { ReactElement } from 'react';

const ArticleLoader = (): ReactElement => (
  <div className="animate-pulse px-3 py-4 grid grid-cols-12">
    <div className="col-span-3">
      <div className="rounded bg-gray-100 h-auto w-full aspect-w-12 aspect-h-8" />
    </div>
    <div className="pl-4 col-span-9">
      <div className="h-2 md:h-4 w-28 md:w-36 bg-gray-100" />
      <div className="h-4 md:h-6 mt-2 bg-gray-100"></div>
      <div className="" />
    </div>
  </div>
);

export default ArticleLoader;
