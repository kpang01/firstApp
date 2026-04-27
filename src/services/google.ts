import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '732130292376-lmou7m2odmamecf925ci2q1j0v6fvu0v.apps.googleusercontent.com',
  });
};