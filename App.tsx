// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import Navigate from './src/navigation/Navigate';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Navigate />
//     </NavigationContainer>
//   );
// }

import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { configureGoogleSignIn } from './src/services/google';

type Screen = 'login' | 'register';

export default function App() {
    const [screen, setScreen] = useState<Screen>('login');

    useEffect(() => {
        configureGoogleSignIn(); 
    }, []);

    return (
        <SafeAreaProvider>
            {screen === 'login' ? (
                <LoginScreen onNavigateRegister={() => setScreen('register')} />
            ) : (
                <RegisterScreen onNavigateLogin={() => setScreen('login')} />
            )}
        </SafeAreaProvider>
    );
  }
  