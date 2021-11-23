import { ReactElement } from 'react';
import Image from 'next/image';
import { Source } from '../../types/source';
import Button from '../Button';

interface SourceDetailProps {
  source: Source;
  onFollowClick: () => void;
}

const SourceDetail = ({
  source,
  onFollowClick,
}: SourceDetailProps): ReactElement => {
  const stats: Array<{ label: string; count: number }> = [
    {
      label: 'Posts',
      count: 20,
    },
    {
      label: 'Followers',
      count: 165,
    },
    {
      label: 'Views',
      count: 0,
    },
  ];

  if (!source) return <></>;

  return (
    <div>
      <div className="bg-gradient-to-r from-[#f16423] rounded-t-lg h-24"></div>
      <div className="text-center border-b-2 border-l-2 border-r-2 rounded-b-lg border-neutral-lighter">
        <div className="inline-block border-4 border-white rounded-lg -mt-11">
          <Image
            src={source?.imageUrl}
            alt={source?.name + ' logo'}
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <div className="px-6">
          <h3 className="my-1">{source?.name}</h3>
          <span>{source?.description}</span>
        </div>
        <Button
          className="my-4"
          variant={source?.isFollowing ? 'solid' : 'outline'}
          onClick={onFollowClick}
        >
          {source?.isFollowing ? 'Following' : 'Follow'}
        </Button>
        <div className="m-4 border rounded-lg bg-neutral-lightest border-neutral-lighter">
          <div className="flex py-2 divide-x divide-neutral-light">
            {stats.map(({ count, label }, index) => (
              <div key={index} className="flex-1">
                <span className="text-lg font-semibold">{count || '-'}</span>
                <br />
                <span className="text-neutral">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceDetail;
