import Colors from "@/constants/Colors";
import { FlatList, ScrollView } from "react-native";
import { View, Text } from "@/components/Themed";
import { defaultStyles } from "@/constants/Styles";
import BoxedIcon from "@/components/BoxedIcon";
import { devices, items, support } from "../../../configs/settings";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ListItem
                icon={item.icon}
                backgroundColor={item.backgroundColor}
                name={item.name}
              />
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ListItem
                icon={item.icon}
                backgroundColor={item.backgroundColor}
                name={item.name}
              />
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ListItem
                icon={item.icon}
                backgroundColor={item.backgroundColor}
                name={item.name}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

type ListItemProps = {
  icon: string;
  backgroundColor: string;
  name: string;
};
const ListItem = ({ name, backgroundColor, icon }: ListItemProps) => {
  return (
    <View style={defaultStyles.item}>
      <BoxedIcon name={icon} backgroundColor={backgroundColor} />
      <Text style={{ fontSize: 18, flex: 1 }}>{name}</Text>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </View>
  );
};
export default Page;
