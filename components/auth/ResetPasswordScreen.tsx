// import {
//   Button,
//   FormWrapper,
//   H2,
//   Paragraph,
//   SubmitButton,
//   Text,
//   Theme,
//   YStack,
// } from "@my/ui";

import { supabase } from "@/libs/supabase";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Button } from "react-native";
import { createParam } from "solito";
import { Link } from "solito/link";
import { z } from "zod";
import { FormWrapper } from "../FormFields/FormWrapper";
import { formFields, SchemaForm } from "../FormFields/SchemaForm";
import { Text } from "../ui/Text";
import { View } from "../ui/View";

const { useParams, useUpdateParams } = createParam<{ email?: string }>();

const ResetPasswordSchema = z.object({
  email: formFields.text.email().describe("Email // your@email.acme"),
});

export const ResetPasswordScreen = () => {
  const { params } = useParams();
  const updateParams = useUpdateParams();
  useEffect(() => {
    if (params?.email) {
      updateParams({ email: undefined }, { web: { replace: true } });
    }
  }, [params?.email, updateParams]);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>();

  async function resetPassword({ email }: z.infer<typeof ResetPasswordSchema>) {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email as string
    );

    if (error) {
      const errorMessage = error?.message.toLowerCase();
      if (errorMessage.includes("email")) {
        form.setError("email", { type: "custom", message: errorMessage });
      } else {
        form.setError("email", { type: "custom", message: errorMessage });
      }
    }
  }

  return (
    <FormProvider {...form}>
      {form.formState.isSubmitSuccessful ? (
        <CheckYourEmail />
      ) : (
        <SchemaForm
          form={form}
          schema={ResetPasswordSchema}
          defaultValues={{
            email: params?.email || "",
          }}
          onSubmit={resetPassword}
          renderAfter={({ submit }) => {
            return (
              <>
                <Button title=" Send Link" onPress={() => submit()} />
                <SignInLink />
              </>
            );
          }}
        >
          {(fields) => (
            <>
              <View
                style={{ flexDirection: "column", gap: 3, marginBottom: 4 }}
              >
                <Text style={{ fontSize: 18 }}>Reset your password</Text>
                <Text>
                  Type in your email and we&apos;ll send you a link to reset
                  your password
                </Text>
              </View>
              {Object.values(fields)}
            </>
          )}
        </SchemaForm>
      )}
    </FormProvider>
  );
};

const CheckYourEmail = () => {
  const email = useWatch<z.infer<typeof ResetPasswordSchema>>({
    name: "email",
  });
  const { reset } = useFormContext();

  return (
    <FormWrapper>
      <FormWrapper.Body>
        <YStack gap="$3">
          <H2>Check Your Email</H2>
          <Paragraph theme="alt1">
            We&apos;ve sent you a reset link. Please check your email ({email})
            and confirm it.
          </Paragraph>
        </YStack>
      </FormWrapper.Body>
      <FormWrapper.Footer>
        <Button
          themeInverse
          icon={ChevronLeft}
          br="$10"
          onPress={() => reset()}
        >
          Back
        </Button>
      </FormWrapper.Footer>
    </FormWrapper>
  );
};

const SignInLink = () => {
  const email = useWatch<z.infer<typeof ResetPasswordSchema>>({
    name: "email",
  });

  return (
    <Link
      href={`/sign-in?${new URLSearchParams(email ? { email } : undefined)}`}
    >
      <Text style={{}}>
        Done resetting?{" "}
        <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
      </Text>
    </Link>
  );
};
