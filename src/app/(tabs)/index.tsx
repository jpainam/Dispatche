import { useEffect, useState } from "react";
import { Channel as ChannelType, StreamChat } from "stream-chat";
import {
  MessageInput,
  Channel,
  ChannelList,
  Chat,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";
const client = StreamChat.getInstance("zw3mdw59fj4v");

export default function Page() {
  const [channel, setChannel] = useState<ChannelType>();
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );
      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park",
      // });
      // await channel.watch();
    };
    connect();
  }, []);
  return (
    <OverlayProvider>
      <Chat client={client}>
        {channel ? (
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        ) : (
          <ChannelList onSelect={setChannel} />
        )}
      </Chat>
    </OverlayProvider>
  );
}
