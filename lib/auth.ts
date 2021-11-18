import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@firebase/auth';
import app from './firebase';

const github: GithubAuthProvider = new GithubAuthProvider();
const google: GoogleAuthProvider = new GoogleAuthProvider();
const twitter: TwitterAuthProvider = new TwitterAuthProvider();

const auth = getAuth(app);

export const githubSigninPopup = (): Promise<string> => {
  return signInWithPopup(auth, github).then((result: UserCredential) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    return credential.accessToken;
  });
};

export const googleSigninPopup = (): Promise<string> => {
  return signInWithPopup(auth, google).then((result: UserCredential) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential.accessToken;
  });
};

export const twitterSigninPopup = (): Promise<string> => {
  return signInWithPopup(auth, twitter).then((result: UserCredential) => {
    const credential = TwitterAuthProvider.credentialFromResult(result);
    return credential.accessToken;
  });
};
