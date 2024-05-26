import { SegmentedControl } from "@/components/SegmentedControl";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import calls from "@/assets/data/calls.json";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { defaultStyles } from "../../../constants/Styles";
import SwipeableRow from "@/components/SwipeableRow";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

const transition = CurvedTransition.delay(100);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My Listings");
  const [items, setItems] = useState(calls);
  const editing = useSharedValue(-30);
  const onEdit = () => {
    console.log("Edit");
    setIsEditing(!isEditing);
  };
  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option == "My Listings") {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  };

  const removeCall = (toDelete: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((item) => item.id !== toDelete.id));
  };

  const animatedPosition = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));
  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => {
            return (
              <SegmentedControl
                selectedOption={selectedOption}
                onOptionPress={onSegmentChange}
                options={["My Listings", "My Reservations"]}
              />
            );
          },
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            scrollEnabled={false}
            itemLayoutAnimation={transition}
            keyExtractor={(item) => item.id.toString()}
            skipEnteringExitingAnimations
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            data={items}
            renderItem={({ item, index }) => {
              return (
                <SwipeableRow onDelete={() => removeCall(item)}>
                  <Animated.View
                    exiting={FadeOutUp}
                    entering={FadeInUp.delay(index * 20)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <AnimatedTouchableOpacity
                      style={[animatedPosition, { paddingLeft: 8 }]}
                      onPress={() => removeCall(item)}
                    >
                      <Ionicons
                        name="remove-circle"
                        size={24}
                        color={Colors.red}
                      />
                    </AnimatedTouchableOpacity>
                    <Animated.View
                      style={[
                        defaultStyles.item,
                        { paddingLeft: 20 },
                        animatedRowStyles,
                      ]}
                    >
                      <Image source={{ uri: item.img }} style={styles.avatar} />

                      <View style={{ flex: 1, gap: 2 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: item.missed ? Colors.red : "#000",
                          }}
                        >
                          {item.name}
                        </Text>

                        <View style={{ flexDirection: "row", gap: 4 }}>
                          <Ionicons
                            name={item.video ? "videocam" : "call"}
                            size={16}
                            color={Colors.gray}
                          />
                          <Text style={{ color: Colors.gray, flex: 1 }}>
                            {item.incoming ? "Incoming" : "Outgoing"}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: Colors.gray }}>
                          {format(item.date, "MM.dd.yy")}
                        </Text>
                        <Ionicons
                          name="information-circle-outline"
                          size={24}
                          color={Colors.primary}
                        />
                      </View>
                    </Animated.View>
                  </Animated.View>
                </SwipeableRow>
              );
            }}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Page;
