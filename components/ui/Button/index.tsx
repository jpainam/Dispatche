import { ThemeProps, useThemeColor } from "@/components/ui/Themed";
import { Button as DefaultButton } from "react-native";

export type ButtonProps = ThemeProps & DefaultButton["props"];
export function View(props: ButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultButton style={[{ backgroundColor }, style]} {...otherProps} />;
}
