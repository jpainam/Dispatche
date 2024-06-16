import { useBottomSheet } from "@/hooks/use-bottomsheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSegments } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";

export default function GlobalBottomSheet() {
  const ref = useRef<BottomSheetModal>(null);
  const { isOpen, component, snapPoints, closeBottomSheet } = useBottomSheet();
  const segments = useSegments();
  useEffect(() => {
    closeBottomSheet();
  }, [segments]);

  useEffect(() => {
    if (isOpen) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [isOpen]);

  const snaps = useMemo(() => snapPoints, [snapPoints]);

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
      snapPoints={snaps}
    >
      {component}
    </BottomSheetModal>
  );
}

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
