import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Source } from '../types/source';
import Button from './Button';
import classNames from 'classnames';

interface SourceItemProps {
  source: Source;
  onFollow: (source: Source, shouldFollow: boolean) => unknown;
  size?: 'sm' | 'default';
  className?: string;
}

const SourceItem = ({
  source,
  onFollow,
  size = 'default',
  className = '',
}: SourceItemProps): ReactElement => {
  return (
    <>
      <div className={classNames('flex items-center', className)}>
        <div className="mr-3 shrink-0">
          <Link href={`/sources/${source?.slug}`}>
            <a className="flex">
              <Image
                src={source.imageUrl}
                alt={`${source.name} logo`}
                width="50"
                height="50"
                className="rounded cursor-pointer"
              />
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <Link href={`/sources/${source?.slug}`}>
            <a className="cursor-pointer line-clamp-1">
              {size === 'sm' ? <h6>{source.name}</h6> : <h5>{source.name}</h5>}
            </a>
          </Link>
          <div
            className={classNames('text-neutral line-clamp-1', {
              'text-sm': size === 'sm',
            })}
          >
            {source.description}
          </div>
        </div>
        <div className="ml-3">
          <Button
            variant={source.isFollowing ? 'solid' : 'outline'}
            onClick={() => onFollow(source, !source.isFollowing)}
          >
            {!source.isFollowing ? 'Follow' : 'Following'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SourceItem;
