import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Publish",
          //   headerLargeTitle: true,
          //   headerShadowVisible: false,
          //   headerStyle: {
          //     backgroundColor: Colors.background,
          //   },
          //   headerSearchBarOptions: {
          //     placeholder: "Search",
          //   },
        }}
      />
    </Stack>
  );
};

export default Layout;
