import { Dialog } from "@headlessui/react";
import { ReactElement } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signinWithGithub, signinWithGoogle } from "../lib/auth";
import firebase from "../lib/firebase";
import { OAuthProvider } from "../types/auth";
import SocialLoginButton from "./SocialLoginButton";
import GithubLogo from "../public/icons/github.svg";
import GoogleLogo from "../public/icons/google.svg";
import TimesIcon from "../public/icons/times.svg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: ModalProps): ReactElement => {
  const { login } = useAuth();

  const handleAuthResponse = (provider: OAuthProvider, res: firebase.auth.UserCredential) => {
    const credential = res.credential as firebase.auth.OAuthCredential;
    login(provider, credential.accessToken);
  }

  const handleGoogleSignin = (): void => {
    signinWithGoogle().then(res => handleAuthResponse('google', res));
  }

  const handleGithubSignin = (): void => {
    signinWithGithub().then(res => handleAuthResponse('github', res));
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed z-10 inset-0 overflow-y-auto"
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
            <TimesIcon
              width="24"
              className="ml-auto cursor-pointer"
              onClick={onClose}
            />
            <Dialog.Title className="font-medium">
              Login
            </Dialog.Title>
            <Dialog.Description className="mt-2">
              Join the community of developers and explore unlimited content
            </Dialog.Description>

            <div className="text-center mt-4">
              <SocialLoginButton
                icon={<GoogleLogo/>}
                text={"Sign in with Google"}
                onClick={handleGoogleSignin}
              />

              <SocialLoginButton
                icon={<GithubLogo/>}
                text={"Sign in with Github"}
                onClick={handleGithubSignin}
              />

              <p className="mt-5 text-sm">
                By signing up you agree with our&nbsp;
                <a href="#" className="underline">Terms of Service</a>&nbsp;
                and&nbsp;
                <a href="#" className="underline">Privacy Policy</a>
                .
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default LoginModal;
