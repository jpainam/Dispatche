import { Button, StyleSheet } from "react-native";

import CustomBottomSheetModal from "@/components/BottomSheet/CustomBottomSheetModal";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { useBottomSheet } from "@/hooks/use-bottomsheet";
import BottomLoginSheet from "@/components/Auth/BottomLoginSheet";

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const { dismiss } = useBottomSheetModal();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  return (
    <View style={styles.container}>
      {/* <CustomBottomSheetModal ref={bottomSheetRef} /> */}
      <Button
        title="Present Modal"
        onPress={() => {
          openBottomSheet({
            snapPoints: ["40%", "75%"],
            component: <BottomLoginSheet />,
          });
        }}
      />
      <Button title="Dismiss Modal" onPress={() => closeBottomSheet()} />
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
