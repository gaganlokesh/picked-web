import { getAccessToken } from "../api/auth";
import { OAuthProvider } from "../types/auth";
import firebase from "./firebase";

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

const github = new firebase.auth.GithubAuthProvider();
const google = new firebase.auth.GoogleAuthProvider();
const twitter = new firebase.auth.TwitterAuthProvider();

export const signinWithGithub = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(github);
}

export const signinWithGoogle = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(google);
}

export const signinWithTwitter = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInWithPopup(twitter);
}

export const persistToken = async ({ accessToken, refreshToken }): Promise<void> => {
  window.localStorage.setItem(accessTokenKey, accessToken);
  window.localStorage.setItem(refreshTokenKey, refreshToken);
}

export const login = async (provider: OAuthProvider, token: string): Promise<void> => {
  return getAccessToken(provider, token)
    .then(tokenResponse => {
      persistToken(tokenResponse);
    })
  ;
}

export const logout = async (): Promise<void> => {
  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(refreshTokenKey);
}
