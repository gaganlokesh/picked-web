import classNames from 'classnames';
import { ReactElement } from 'react';

const SourceItemLoader = ({
  className = '',
}: {
  className?: string;
}): ReactElement => {
  return (
    <div className={classNames('animate-pulse flex items-center', className)}>
      <div className="flex-shrink-0 w-12 h-12 mr-4 bg-neutral-lighter rounded"></div>
      <div className="flex-1">
        <div className="w-1/3 h-4 bg-neutral-lighter"></div>
        <div className="w-4/5 h-4 bg-neutral-lighter mt-3"></div>
      </div>
      <div className="w-20 h-9 bg-neutral-lighter rounded-full ml-4"></div>
    </div>
  );
};

export default SourceItemLoader;
