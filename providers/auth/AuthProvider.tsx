import { User } from "@supabase/supabase-js";
import { useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { Platform } from "react-native";

import { useSession } from "../session";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const session = useSession();

  //useProtectedRoute(session?.user ?? null);

  useEffect(() => {
    // check if use exist, and redirect, check if first time, redirect to onboarding
  }, []);

  return <>{children}</>;
};

export function useProtectedRoute(user: User | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      replaceRoute("/onboarding");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      replaceRoute("/");
    }
  }, [user, segments]);
}

/**
 * temporary fix
 *
 * see https://github.com/expo/router/issues/740
 * see https://github.com/expo/router/issues/745
 *  */
const replaceRoute = (href: string) => {
  if (Platform.OS === "ios") {
    setTimeout(() => {
      //router.replace(href);
    }, 1);
  } else {
    setImmediate(() => {
      //router.replace(href);
    });
  }
};
