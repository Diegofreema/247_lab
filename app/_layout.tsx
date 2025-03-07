import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfigParams,
} from "react-native-toast-message";
import { colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OfflineBanner } from "@/components/ui/offlineBanner";
import * as Updates from "expo-updates";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Customizes the appearance of error toasts.
   *
   * @param {object} props Props forwarded from `react-native-toast-message`.
   * @returns {React.ReactElement} The customized error toast component.
   *
   * @example
   * const toastConfig = {
   *   error: ({ text1, text2, ...props }) => (
   *     <ErrorToast
   *       {...props}
   *       text1Style={{
   *         fontSize: 17,
   *       }}
   *       text2Style={{
   *         fontSize: 15,
   *       }}
   *     >
   *       {text1}
   *       {text2}
   *     </ErrorToast>
   *   ),
   * };
   */
  /******  0f9b39ad-d455-4504-9a6a-3575c7e8cbf2  *******/
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
        width: "90%",
        backgroundColor: colors.green,
        padding: 10,
        marginHorizontal: "auto",
        borderRadius: 10,
      }}
    >
      <Text
        style={{ fontFamily: "PoppinsMedium", color: "white", fontSize: 11 }}
      >
        {text1}
      </Text>
      <Text
        style={{ fontFamily: "PoppinsMedium", color: "white", fontSize: 13 }}
      >
        {text2}
      </Text>
    </View>
  ),
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.log(error);
      }
    }
    onFetchUpdateAsync();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot initialRouteName="(app)" />
              <OfflineBanner />
            </SafeAreaView>
            <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
