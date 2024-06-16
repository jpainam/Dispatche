import { supabase } from "@/libs/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { tokenProvider } from "./tokenProvider";
import { useProfile } from "@/hooks/use-profile";
import { View } from "@/components/ui/View";

const client = StreamChat.getInstance(
  `${process.env.EXPO_PUBLIC_STREAM_API_KEY}`
);

export const StreamChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const session = useSession();
  const { data: profile, isLoading } = useProfile();

  useEffect(() => {
    const connect = async () => {
      if (session?.user?.id && profile) {
        tokenProvider().then(console.log);
        await client.connectUser(
          {
            id: session.user.id,
            name: session.user.user_metadata.full_name,
            image: supabase.storage
              .from("avatars")
              .getPublicUrl(profile.avatar_url!).data.publicUrl,
          },
          tokenProvider
        );
      }
      setIsReady(true);
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [session?.user?.id, profile]);

  if (!isReady || isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
