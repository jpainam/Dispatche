import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { tokenProvider } from "./tokenProvider";
import { useSession } from "../session";
import { supabase } from "@/libs/supabase";

const apiKey = `${process.env.EXPO_PUBLIC_STREAM_API_KEY}`;

export const StreamVideoProvider = ({ children }: PropsWithChildren) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const session = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    const initVideoClient = async () => {
      const user = {
        id: session.user.id,
        name: "full_name",
        image: supabase.storage
          .from("avatars")
          .getPublicUrl("profile.avatar_url").data.publicUrl,
      };
      const client = new StreamVideoClient({ apiKey, user, tokenProvider });
      setVideoClient(client);
    };

    initVideoClient();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [session?.user?.id]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
