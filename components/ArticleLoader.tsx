import classNames from 'classnames';
import { ReactElement } from 'react';

interface ArticleLoaderProps {
  className?: string;
  variant?: 'wide' | 'minimal';
}

const ArticleLoader = ({
  className = '',
  variant = 'wide',
}: ArticleLoaderProps): ReactElement => {
  if (variant === 'wide') {
    return (
      <div className={classNames('flex animate-pulse', className)}>
        <div className="w-[26%] pt-[17%] mr-4 rounded bg-neutral-lighter" />
        <div className="flex-1">
          <div className="w-1/4 h-2 bg-neutral-lighter md:h-4" />
          <div className="h-4 mt-2 bg-neutral-lighter md:h-6"></div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={classNames('animate-pilse', className)}>
        <div className="w-1/4 h-3 bg-neutral-lighter"></div>
        <div className="w-full h-4 my-2 bg-neutral-lighter"></div>
        <div className="w-2/5 h-3 bg-neutral-lighter"></div>
      </div>
    );
  }

  return <></>;
};

export default ArticleLoader;
