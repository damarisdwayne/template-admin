import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { InputLabelGroup } from "@/components/form/input-group";
import { IAuthRequest } from "@/types/auth";
import { AuthFormSchema } from "@/schemas/auth";
import { AlertDestructive } from "../alert-error";

interface AuthFormProps {
  title: string;
  submitText: string;
  onSubmit: (data: IAuthRequest) => Promise<void>;
}

export const AuthForm = ({ title, submitText, onSubmit }: AuthFormProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { email, password } = watch();

  const hasEmailError = Boolean(errors.email);
  const hasPasswordError = Boolean(errors.password);

  const isButtonDisabled =
    !email || !password || hasEmailError || hasPasswordError;

  const handleFormSubmit = async () => {
    const dataToSend: IAuthRequest = {
      email,
      password,
    };
    try {
      await onSubmit(dataToSend);
      reset();
    } catch {
      !errors && setShowAlert(true);
    }
  };

  return (
    <div>
      {showAlert && <AlertDestructive />}
      <h1 className="text-xl font-bold mb-5">{title}</h1>
      <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputLabelGroup
              id="email"
              label="Email"
              type="email"
              errorMessage={errors.email?.message}
              {...field}
              required
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputLabelGroup
              id="password"
              label="Senha"
              type="password"
              errorMessage={errors.password?.message}
              {...field}
              required
            />
          )}
        />
        <Button type="submit" disabled={isButtonDisabled} className="w-full">
          {submitText}
        </Button>
      </form>
    </div>
  );
};
