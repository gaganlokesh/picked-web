import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../types/article';
import { formatDate } from '../utils/date';
import IconBookmark from '../public/icons/bookmark.svg';
import IconBookmarked from '../public/icons/bookmark-fill.svg';
import Upvote from './Upvote';
import ArticleActionsMenu from './ArticleActionsMenu';

import styles from './ArticleCard.module.css';

interface BaseArticleProps {
  article: Article;
  className?: string;
  onClick: (id: number) => void;
}

interface WideArticleProps extends BaseArticleProps {
  variant?: 'wide';
  onBookmarkClick: (id: number, shouldBookmark: boolean) => void;
  onUpvoteClick: (id: number, shouldUpvote: boolean) => void;
  onReportClick: () => void;
  onHideClick: (id: number) => void;
}

interface MinimalArticleProps extends BaseArticleProps {
  variant: 'minimal';
  onBookmarkClick?: (id: number, shouldBookmark: boolean) => void;
  onUpvoteClick?: (id: number, shouldUpvote: boolean) => void;
  onReportClick?: () => void;
  onHideClick?: (id: number) => void;
}

type ArticleProps = MinimalArticleProps | WideArticleProps;

const ArticleCard = ({
  article,
  onClick,
  onBookmarkClick,
  onUpvoteClick,
  onReportClick,
  onHideClick,
  variant = 'wide',
  className = '',
}: ArticleProps): JSX.Element => {
  let showMedia: boolean, showActions: boolean;

  switch (variant) {
    case 'wide':
      showMedia = true;
      showActions = true;
      break;
    case 'minimal':
      showMedia = false;
      showActions = false;
      break;
  }

  return (
    <>
      <article className={classNames(styles[variant], className)}>
        {showMedia && article?.imageUrl && (
          <div className={styles.media}>
            <Image
              src={article.imageUrl}
              placeholder="blur"
              blurDataURL={article.imagePlaceholder}
              alt={article.title}
              width={210}
              height={145}
              layout="responsive"
              className="rounded"
              unoptimized={true}
            />
          </div>
        )}
        <div className={styles.content}>
          <div>
            <Link href={`/sources/${encodeURIComponent(article.source?.slug)}`}>
              <a className={styles.source}>{article?.source.name}</a>
            </Link>
            <h2 className={styles.title}>
              <a href={article.url} onClick={() => onClick(article.id)}>
                {article.title}
              </a>
            </h2>
            <div className={styles.meta}>
              <span>{formatDate(article.publishedAt)}</span>
              {!!article.readTime && (
                <>
                  <span>&nbsp;•&nbsp;</span>
                  <span>{article.readTime} min read</span>
                </>
              )}
            </div>
          </div>
          {showActions && (
            <div className={styles.actions}>
              <Upvote
                upvoted={article.isUpvoted}
                count={article.upvotesCount}
                onUpvote={() => onUpvoteClick(article.id, !article.isUpvoted)}
              />
              <div className="flex text-neutral-dark">
                <a
                  className="cursor-pointer"
                  onClick={() =>
                    onBookmarkClick(article.id, !article.isBookmarked)
                  }
                >
                  {!article.isBookmarked ? (
                    <IconBookmark />
                  ) : (
                    <IconBookmarked />
                  )}
                </a>
                <ArticleActionsMenu
                  article={article}
                  onReportClick={onReportClick}
                  onHideClick={onHideClick}
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
