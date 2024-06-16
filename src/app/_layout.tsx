import GlobalBottomSheet from "@/components/GlobalBottomSheet";
import { supabase } from "@/libs/supabase";
import { Provider } from "@/providers";
import { loadThemePromise } from "@/providers/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { LogBox, View } from "react-native";

import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Cannot update a component", "You are setting the style"]);

export default function RootLayoutNav() {
  const [initialSession, setInitialSession] = useState<Session | null>(null);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [sessionLoadAttempted, setSessionLoadAttempted] = useState(false);
  const [fontLoaded, error] = useFonts({
    Inter: require("../../assets/fonts/Inter-Medium.ttf"),
    InterBold: require("../../assets/fonts/Inter-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data) {
          setInitialSession(data.session);
        }
      })
      .finally(() => {
        setSessionLoadAttempted(true);
      });
  }, []);

  useEffect(() => {
    loadThemePromise.then(() => {
      setThemeLoaded(true);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded && sessionLoadAttempted) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded, sessionLoadAttempted]);

  if (!fontLoaded || !themeLoaded || !sessionLoadAttempted) {
    return null;
  }
  console.log("RootLayoutNav  Runing");
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider initialSession={initialSession}>
        <GlobalBottomSheet />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="otp"
            options={{
              headerTitle: "Enter Your Phone Number",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="verify/[phone]"
            options={{
              title: "Verify Your Phone Number",
              headerShown: true,
              headerBackTitle: "Edit number",
            }}
          />
          <Stack.Screen
            name="(modals)"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </Provider>
    </View>
  );
}
