import { useColorScheme } from "@/components/useColorScheme";
import { SupabaseProvider } from "@/providers/supabase-provider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SupabaseProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          {Platform.OS === "web" && <ReactQueryDevtools />}
          <RootLayoutNav />
        </QueryClientProvider>
      </SafeAreaProvider>
    </SupabaseProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
