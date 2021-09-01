import dayjs from 'dayjs';
import Image from 'next/image';
import { Article } from '../types/article';

interface ArticleProps {
  article: Article;
}

const ArticleCard = (props: ArticleProps): JSX.Element => {
  const { article } = props;

  const formatDate = (date: Date): string => {
    const instance = dayjs(date);
    if (instance.year() !== dayjs().year()) {
      return instance.format('D MMM, YYYY');
    }

    return instance.format('D MMM');
  };

  return (
    <>
      <article className="px-3 py-4 grid grid-cols-12">
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
          <div className="text-xs md:text-sm font-medium text-pink-600 uppercase">
            {article?.source.name}
          </div>
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
        </div>
      </article>
    </>
  );
};

export default ArticleCard;
