import { supabase } from "@/libs/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { tokenProvider } from "./tokenProvider";

const client = StreamChat.getInstance(
  `${process.env.EXPO_PUBLIC_STREAM_API_KEY}`
);

export const StreamChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  useSession();
  const session = useSession();

  const fetchProfile = async (userId: string) => {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return data;
  };

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const connect = async () => {
      tokenProvider().then(console.log);
      const profile = await fetchProfile(session.user.id);
      if (!profile) {
        throw new Error("No profile found");
      }
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
      setIsReady(true);
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [session?.user?.id]);

  //   if (!isReady) {
  //     return <ActivityIndicator />;
  //   }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
