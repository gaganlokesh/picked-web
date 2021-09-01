import firebase from './firebase';

const github = new firebase.auth.GithubAuthProvider();
const google = new firebase.auth.GoogleAuthProvider();
const twitter = new firebase.auth.TwitterAuthProvider();

export const githubSigninPopup = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(github);
};

export const googleSigninPopup = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(google);
};

export const twitterSigninPopup = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(twitter);
};
