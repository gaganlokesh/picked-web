import styles from '../styles/Home.module.css';
import Feed from '../components/Feed';
import FeedLayout from '../components/layouts/FeedLayout';

export default function Home() {
  return (
    <>
      <Feed requestUrl="/articles" />
    </>
  );
}

Home.getLayout = FeedLayout;
