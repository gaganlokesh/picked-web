import styles from '../styles/Home.module.css';
import Feed from '../components/Feed';
import FeedLayout from '../components/layouts/FeedLayout';
import { useAuth } from '../contexts/AuthContext';
import SuggestedSources from '../components/widgets/SuggestedSources';

export default function Home() {
  const { isReady } = useAuth();
  const requestUrl = isReady ? '/articles' : null;

  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex">
          <main className="flex-1">
            <Feed requestUrl={requestUrl} />
          </main>
          <div className="mx-10"></div>
          <aside className="w-96">
            <SuggestedSources />
          </aside>
        </div>
      </div>
    </>
  );
}
