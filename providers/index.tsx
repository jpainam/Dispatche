import { Session } from "@supabase/supabase-js";
import React from "react";

import { supabase } from "@/libs/supabase";
import { BottomSheetModalProvider } from "./bottom-sheet-modal";
import { GestureHandler } from "./gesture-handler";
import { QueryClientProvider } from "./react-query";
import { SafeAreaProvider } from "./safe-area";
import { SessionContextProvider } from "./session";
import { UniversalThemeProvider } from "./theme";
import { StreamCallProvider, StreamChatProvider } from "./stream-chat";

export function Provider({
  initialSession,
  children,
}: {
  initialSession?: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      <Providers>{children}</Providers>
    </SessionContextProvider>
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
  StreamChatProvider,
  StreamCallProvider,
  //   TamaguiProvider,
  //   ToastProvider,
  QueryClientProvider,
  BottomSheetModalProvider,
]);
