import { ReactElement, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import IconUpvote from '../public/icons/arrow-up.svg';

interface UpvoteProps {
  upvoted: boolean;
  count: number;
  onUpvote: () => void;
}

const Upvote = ({ upvoted, count, onUpvote }: UpvoteProps): ReactElement => {
  const [currentCount, setCurrentCount] = useState<number>(count);
  const [prevCount, setPrevCount] = useState<number>();
  const [transitionDirection, setTransitionDirection] = useState<
    'up' | 'down'
  >();
  const values = useMemo(
    () => [currentCount, prevCount].sort(),
    [currentCount, prevCount]
  );

  useEffect(() => {
    if (count !== currentCount) {
      if (count > currentCount) {
        setTransitionDirection('up');
      } else {
        setTransitionDirection('down');
      }

      setPrevCount(currentCount);
      setCurrentCount(count);
    }
  }, [count]);

  const classes = classNames(
    'flex overflow-hidden text-xs border h-[26px] rounded-full cursor-pointer pl-2 pr-[10px] font-medium',
    {
      'bg-neutral-lighter border-neutral-light text-neutral-dark': !upvoted,
      'bg-primary-lighter border-primary-light text-primary-dark': upvoted,
    }
  );

  return (
    <a onClick={onUpvote} className={classes}>
      <IconUpvote className="self-center mr-2" />
      {currentCount > 0 ? (
        <div
          className={classNames(
            'flex flex-col transform-gpu transition duration-300',
            {
              '-translate-y-full': transitionDirection === 'up',
            }
          )}
        >
          {values.map((value, index) => (
            <div key={index} className="leading-6">
              {value}
            </div>
          ))}
        </div>
      ) : (
        <span className="leading-6">Upvote</span>
      )}
    </a>
  );
};

export default Upvote;
