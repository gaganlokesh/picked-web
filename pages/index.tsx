import styles from '../styles/Home.module.css';
import Feed from '../components/Feed';
import FeedLayout from '../components/layouts/FeedLayout';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isReady } = useAuth();
  const requestUrl = isReady ? '/articles' : null;

  return (
    <>
      <Feed requestUrl={requestUrl} />
    </>
  );
}

Home.getLayout = FeedLayout;
