import { Dialog } from '@headlessui/react';
import { ReactElement } from 'react';
import { authorizeWithProvider } from '../lib/auth';
import SocialLoginButton from './SocialLoginButton';
import GithubLogo from '../public/icons/github.svg';
import GoogleLogo from '../public/icons/google.svg';
import IconTimes from '../public/icons/times.svg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: ModalProps): ReactElement => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <a className="text-xl" onClick={onClose}>
              <IconTimes className="ml-auto cursor-pointer" />
            </a>
            <Dialog.Title className="font-medium">Login</Dialog.Title>
            <Dialog.Description className="mt-2">
              Join the community of developers and explore unlimited content
            </Dialog.Description>

            <div className="mt-4 text-center">
              <div className="w-4/5 mx-auto">
                <SocialLoginButton
                  className="my-2"
                  icon={<GoogleLogo />}
                  onClick={() => authorizeWithProvider('google')}
                >
                  Sign in with Google
                </SocialLoginButton>

                <SocialLoginButton
                  className="my-2"
                  icon={<GithubLogo />}
                  onClick={() => authorizeWithProvider('github')}
                >
                  Sign in with Github
                </SocialLoginButton>
              </div>

              <p className="mt-5 text-sm">
                By signing up you agree with our&nbsp;
                <a href="#" className="underline">
                  Terms of Service
                </a>
                &nbsp; and&nbsp;
                <a href="#" className="underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LoginModal;
