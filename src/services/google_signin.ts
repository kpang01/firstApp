import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    console.log('User Info:', userInfo);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled login');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Already signing in');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available');
    } else {
      console.log('Error:', error);
    }
  }
};