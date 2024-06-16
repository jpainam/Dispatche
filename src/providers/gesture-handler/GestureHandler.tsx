import { GestureHandlerRootView } from "react-native-gesture-handler";

export const GestureHandler = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
};
