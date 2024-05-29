import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const useRedirectAfterSignOut = () => {
  const router = useRouter();
  useEffect(() => {
    const signOutListener = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        //router.replace("/settings");
      }
    });
    return () => {
      signOutListener.data.subscription.unsubscribe();
    };
  }, [supabase, router]);
};

export const AuthStateChangeHandler = () => {
  useRedirectAfterSignOut();
  return null;
};
