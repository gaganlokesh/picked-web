import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../types/article';

interface ArticleProps {
  article: Article;
  onBookmarkClick: (id: number, shouldBookmark: boolean) => void;
}

const formatDate = (date: Date): string => {
  const instance = dayjs(date);
  const template = instance.year() !== dayjs().year() ? 'D MMM, YYYY' : 'D MMM';

  return instance.format(template);
};

const ArticleCard = ({
  article,
  onBookmarkClick,
}: ArticleProps): JSX.Element => {
  return (
    <>
      <article className="grid grid-cols-12 py-4">
        <div className="col-span-3">
          <Image
            src={article.imageUrl}
            placeholder="blur"
            blurDataURL={article.imagePlaceholder}
            alt={article.title}
            width={210}
            height={145}
            layout="responsive"
            className="rounded"
          />
        </div>
        <div className="pl-4 col-span-9">
          <Link
            href={{
              pathname: '/sources/[slug]',
              query: { slug: article?.source.slug },
            }}
          >
            <a className="text-xs md:text-sm font-medium text-pink-600 tracking-widest uppercase">
              {article?.source.name}
            </a>
          </Link>
          <h3 className="font-bold leading-tight md:leading-normal">
            <a href={article.url}>{article.title}</a>
          </h3>
          <div className="text-xs md:text-base font-light">
            <span>{formatDate(article.publishedAt)}</span>
            {!!article.readTime && (
              <>
                <span>&nbsp;•&nbsp;</span>
                <span>{article.readTime} min read</span>
              </>
            )}
          </div>
          <a onClick={() => onBookmarkClick(article.id, !article.isBookmarked)}>
            {!article.isBookmarked ? 'BOOKMARK' : 'REMOVE'}
          </a>
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
