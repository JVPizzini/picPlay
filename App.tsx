import React from 'react';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//Hooks
import { AuthProvider } from './src/hooks/auth';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

if (Platform.OS === 'android') {
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
  // only android needs polyfill
}

// Styles
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';

//Fonts
import { Lato_400Regular, Lato_400Regular_Italic, Lato_700Bold } from '@expo-google-fonts/lato';

//Screens (Routers)
import { SignIn } from './src/screens/SignIn';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

/*
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({ Lato_400Regular, Lato_400Regular_Italic, Lato_700Bold });

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
*/
