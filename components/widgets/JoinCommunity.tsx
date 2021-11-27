import { ReactElement } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authorizeWithProvider } from '../../lib/auth';
import SocialLoginButton from '../SocialLoginButton';
import GoogleLogo from '../../public/icons/google.svg';
import GithubLogo from '../../public/icons/github.svg';
import TwitterLogo from '../../public/icons/twitter.svg';

const JoinCommunity = (): ReactElement => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <></>;

  return (
    <div className="p-5 text-center border-2 border-neutral-lighter rounded-xl">
      <h4 className="text-neutral-semidark">
        Join a community of tech enthusiasts
      </h4>
      <div className="w-4/5 mx-auto my-3">
        <SocialLoginButton
          className="my-2"
          icon={<GoogleLogo />}
          onClick={() => authorizeWithProvider('google')}
        >
          Signin with Google
        </SocialLoginButton>

        <SocialLoginButton
          className="my-2"
          icon={<GithubLogo />}
          onClick={() => authorizeWithProvider('github')}
        >
          Signin with Github
        </SocialLoginButton>

        <SocialLoginButton
          className="my-2"
          icon={<TwitterLogo />}
          onClick={() => authorizeWithProvider('twitter')}
        >
          Signin with Twitter
        </SocialLoginButton>
      </div>
      <div className="w-11/12 mx-auto text-sm text-center text-neutral">
        By signing up, you agree to our&nbsp;
        <a className="hover:underline text-primary" href="#">
          Terms of Service
        </a>
        &nbsp;and&nbsp;
        <a className="hover:underline text-primary" href="#">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default JoinCommunity;
