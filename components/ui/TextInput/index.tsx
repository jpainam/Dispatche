import { ThemeProps, useThemeColor } from "@/components/ui/Themed";
import * as React from "react";
import { TextInput as DefaultTextInput, StyleSheet } from "react-native";

export type TextInputProps = ThemeProps & DefaultTextInput["props"];

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <TextInput
      style={[{ backgroundColor }, style, styles.input]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
