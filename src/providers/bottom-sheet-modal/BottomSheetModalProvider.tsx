import { BottomSheetModalProvider as BottomSheetModalProviderOG } from "@gorhom/bottom-sheet";

export const BottomSheetModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <BottomSheetModalProviderOG>{children}</BottomSheetModalProviderOG>;
};
