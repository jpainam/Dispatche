import { useStringFieldInfo, useTsController } from "@ts-react/form";
import { useId } from "react";
import { Fieldset, Input, Label, Theme } from "tamagui";

import { FieldError } from "../FieldError";
import { Shake } from "../Shake";

import { TextInput as DefaultTextInput, StyleSheet } from "react-native";
import { ThemeProps } from "../ui/Themed";

export type TextInputProps = ThemeProps & DefaultTextInput["props"];

export const TextField = (props: TextInputProps) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { label, placeholder, isOptional, maxLength, isEmail } =
    useStringFieldInfo();
  const id = useId();
  const disabled = isSubmitting;

  return (
    <Theme name={error ? "red" : null} forceClassName>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size || "$3"} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <TextInput
            disabled={disabled}
            maxLength={maxLength}
            placeholderTextColor="$color10"
            spellCheck={isEmail ? false : undefined}
            autoCapitalize={isEmail ? "none" : undefined}
            inputMode={isEmail ? "email" : undefined}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholder={placeholder}
            id={id}
            {...props}
          />
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};
