import { withStaticProperties } from "@/utils/withStaticProperties";
import { useHeaderHeight as useHeaderHeightOG } from "@react-navigation/elements";
import { createContext, forwardRef, useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const useHeaderHeight = () => {
  try {
    return useHeaderHeightOG();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return 0;
  }
};

const FormWrapperContext = createContext<{ height: number } | null>(null);
/**
 * this utility component is for creating forms where we want to
 * push the action button to the bottom of the screen on native
 * it also handles keyboard avoidance
 *
 * wrap the fields inside Body and the actions in Footer
 *
 * you may use asChild on the wrapper as well
 */
const Wrapper = forwardRef(function Wrapper(props, ref) {
  const [height, setHeight] = useState(0);

  return (
    <FormWrapperContext.Provider value={{ height }}>
      <View
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height);
        }}
        style={{
          justifyContent: "space-between",
          gap: 4,
          flex: 1,
          width: "100%",
          maxWidth: 600,
          alignSelf: "center",
        }}
        {...props}
      />
    </FormWrapperContext.Provider>
  );
});

const Body = forwardRef(function Body(props, ref) {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          padding: 16,
          gap: 2,
          paddingBottom: 32,
        }}
        {...props}
      />
    </ScrollView>
  );
});

/**
 * on native, this will be pushed to the bottom of the screen
 */
const Footer = forwardRef(function Footer(props, ref) {
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const formWrapperContext = useContext(FormWrapperContext);
  const modalOffsetFromTop = formWrapperContext
    ? dimensions.height - formWrapperContext.height
    : headerHeight;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={modalOffsetFromTop}
    >
      <View
        style={{
          flexDirection: "column-reverse",
          gap: 4,
          paddingHorizontal: 4,
          paddingBottom: 4,
        }}
        {...props}
      />
    </KeyboardAvoidingView>
  );
});

export const FormWrapper = withStaticProperties(Wrapper, {
  Body,
  Footer,
});
