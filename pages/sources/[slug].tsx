import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';
import fetcher from '../../api/fetcher';
import Feed from '../../components/Feed';
import FeedLayout from '../../components/layouts/FeedLayout';
import { Source } from '../../types/source';

const SourcePage = (): ReactElement => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: source, error } = useSWR<Source>(
    slug ? `/sources/${slug}` : null,
    fetcher
  );

  return (
    <>
      <h1>{source?.name}</h1>
      <Feed requestUrl={slug ? `/sources/${slug}/articles` : null} />
    </>
  );
};

SourcePage.getLayout = FeedLayout;

export default SourcePage;
