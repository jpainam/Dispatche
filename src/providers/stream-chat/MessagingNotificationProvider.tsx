import { PropsWithChildren, useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { StreamChat } from "stream-chat";
import { useSession } from "../session";
import { ActivityIndicator } from "react-native";
import { View } from "@/components/ui/View";

const client = StreamChat.getInstance(
  `${process.env.EXPO_PUBLIC_STREAM_API_KEY}`
);

export const MessagingNotificationProvider = ({
  children,
}: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const session = useSession();

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      if (!session?.user) return;
      const token = await messaging().getToken();
      const push_provider = "firebase";
      const push_provider_name = "FirebaseFCM"; // name an alias for your push provider (optional)
      client.addDevice(
        token,
        push_provider,
        session.user.id,
        push_provider_name
      );
      // client.setLocalDevice({
      //   id: token,
      //   push_provider,
      //   // push_provider_name is meant for optional multiple providers support, see: https://getstream.io/chat/docs/react/push_providers_and_multi_bundle
      //   push_provider_name,
      // });
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();

      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
};
