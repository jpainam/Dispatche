import { Button, StyleSheet } from "react-native";

import CustomBottomSheetModal from "@/components/BottomSheet/CustomBottomSheetModal";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const { dismiss } = useBottomSheetModal();

  return (
    <View style={styles.container}>
      <CustomBottomSheetModal ref={bottomSheetRef} />
      <Button title="Present Modal" onPress={handlePresentModalPress} />
      <Button title="Dismiss Modal" onPress={() => dismiss()} />
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
