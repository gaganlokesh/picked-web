import styles from '../styles/Home.module.css';
import { ReactElement } from 'react';
import Feed from '../components/Feed';
import { useAuth } from '../contexts/AuthContext';
import SuggestedSources from '../components/widgets/SuggestedSources';
import SuggestedReading from '../components/widgets/SuggestedReading';
import JoinCommunity from '../components/widgets/JoinCommunity';
import AppLayout from '../components/layouts/AppLayout';

function Home(): ReactElement {
  const { isReady, isLoggedIn } = useAuth();
  const requestUrl = isReady ? '/feed' : null;

  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex">
          <main className="flex-1">
            <Feed requestUrl={requestUrl} />
          </main>
          <div className="mx-6 hidden lg:block xl:mx-12"></div>
          <aside className="hidden w-[325px] lg:block xl:w-[370px]">
            <div className="grid gap-y-6">
              <JoinCommunity />
              <SuggestedSources />
              <SuggestedReading />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

Home.getLayout = AppLayout;

export default Home;
