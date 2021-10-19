import styles from '../styles/Home.module.css';
import Feed from '../components/Feed';
import FeedLayout from '../components/layouts/FeedLayout';
import { useAuth } from '../contexts/AuthContext';
import SuggestedSources from '../components/widgets/SuggestedSources';
import SuggestedReading from '../components/widgets/SuggestedReading';

export default function Home() {
  const { isReady } = useAuth();
  const requestUrl = isReady ? '/articles' : null;

  return (
    <>
      <div className="container py-5 mx-auto">
        <div className="flex">
          <main className="flex-1">
            <Feed requestUrl={requestUrl} />
          </main>
          <div className="hidden mx-5 xl:mx-10 lg:block"></div>
          <aside className="hidden w-96 lg:block">
            <div className="grid gap-y-6">
              <SuggestedSources />
              <SuggestedReading />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
