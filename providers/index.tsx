import { Session } from "@supabase/supabase-js";
import React from "react";

import { AuthProvider } from "./auth";
import { BottomSheetModalProvider } from "./bottom-sheet-modal";
import { QueryClientProvider } from "./react-query";
import { SafeAreaProvider } from "./safe-area";
// import { TamaguiProvider } from "./tamagui";
import { GestureHandler } from "./gesture-handler";
import { UniversalThemeProvider } from "./theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { ToastProvider } from "./toast";

// export { loadThemePromise } from "./theme/UniversalThemeProvider";

export function Provider({
  initialSession,
  children,
}: {
  initialSession?: Session | null;
  children: React.ReactNode;
}) {
  return (
    <AuthProvider initialSession={initialSession}>
      <Providers>{children}</Providers>
    </AuthProvider>
  );
}

const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => {
    const Provider = Prev ? (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ) : (
      <Curr>{children}</Curr>
    );
    return Provider;
  });

const Providers = compose([
  UniversalThemeProvider,
  SafeAreaProvider,
  GestureHandler,
  //   TamaguiProvider,
  //   ToastProvider,
  QueryClientProvider,
  BottomSheetModalProvider,
]);
