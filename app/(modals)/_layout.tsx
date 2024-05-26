import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="new-chat"
        options={{
          presentation: "modal",
          title: "New Chat",
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerRight: () => (
            <Link href={"/(tabs)/chats"} asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.lightGray,
                  borderRadius: 20,
                  padding: 4,
                }}
              >
                <Ionicons name="close" color={Colors.gray} size={30} />
              </TouchableOpacity>
            </Link>
          ),
          headerSearchBarOptions: {
            placeholder: "Search name or number",
            hideWhenScrolling: false,
          },
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default Layout;
