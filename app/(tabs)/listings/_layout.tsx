import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Listings",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",

          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="add" size={30} color={Colors.primary} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
