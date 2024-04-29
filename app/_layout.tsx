import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useLayoutEffect, useState } from 'react';
import { GluestackUIProvider, Text, Box, View } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useColorScheme } from '@/components/useColorScheme';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import { colors } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  transparentToast: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: colors.green,
        padding: 10,
        marginHorizontal: 'auto',
        borderRadius: 10,
      }}
    >
      <Text style={{ fontFamily: 'PoppinsBold', color: 'white' }}>{text1}</Text>
      <Text style={{ fontFamily: 'PoppinsBold', color: 'white' }}>{text2}</Text>
    </View>
  ),
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    ...FontAwesome.font,
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
