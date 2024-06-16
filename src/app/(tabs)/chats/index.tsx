import { View, Text, ScrollView, FlatList } from "react-native";
import chats from "../../../../assets/data/chats.json";
import ChatRow from "@/components/ChatRow";
import { defaultStyles } from "@/constants/Styles";
import { useBottomSheet } from "@/hooks/use-bottomsheet";
import { Button } from "@/components/ui/Button";
import BottomLoginSheet from "@/components/Auth/BottomLoginSheet";

const Page = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: 40,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1, flexDirection: "column", gap: 2 }}>
              <Button
                title=" Modal"
                onPress={() => {
                  openBottomSheet({
                    snapPoints: ["40%", "75%"],
                    component: <BottomLoginSheet />,
                  });
                }}
              />

              <ChatRow {...item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};
export default Page;
