import { ReactElement, ReactNode } from 'react';

const FeedLayout = (children: ReactNode): ReactElement => {
  return (
    <>
      <div className="grid grid-cols-12">
        <main className="col-span-12 md:col-span-7 md:col-start-3">
          {children}
        </main>
      </div>
    </>
  );
};

export default FeedLayout;
