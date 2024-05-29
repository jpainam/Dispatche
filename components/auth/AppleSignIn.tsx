import { initiateAppleSignIn } from "@/libs/auth/initiateAppleSignIn";
import { supabase } from "@/libs/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

export function AppleSignIn() {
  const router = useRouter();

  async function signInWithApple() {
    try {
      const { token, nonce } = await initiateAppleSignIn();
      // Sign in via Supabase Auth.
      if (token) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: token,
          nonce: nonce,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        //if (!error) router.replace("/");
        if (error) throw error;
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if (e instanceof Error && "code" in e) {
        if (e.code === "ERR_REQUEST_CANCELED") {
          // handle if the user canceled the sign-in flow
        } else {
          // handle any other errors
        }
      } else {
        console.error("Unexpected error from Apple SignIn: ", e);
      }
    }
  }
  if (Platform.OS !== "ios") {
    return null;
  }
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: "100%", height: 44 }}
      onPress={signInWithApple}
    />
  );
}
