import { View, StyleSheet, Text } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomLoginSheet from "../BottomLoginSheet";
export type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["40%", "75%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={ref}
      index={0}
      backgroundStyle={styles.contentContainer}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
    >
      <BottomLoginSheet />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});

export default CustomBottomSheetModal;
