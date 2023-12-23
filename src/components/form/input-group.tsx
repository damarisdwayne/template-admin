import { Label } from "@/components/ui/label";
import React, { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

interface InputLabelGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const InputLabelGroup: React.FC<InputLabelGroupProps> = ({
  label,
  errorMessage,
  ...inputProps
}) => {
  const hasError = Boolean(errorMessage);
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label.toLowerCase()} className="text-left">
        {label}
      </Label>
      <Input
        className={`${errorMessage ? "border-destructive" : "border-inherit"}`}
        {...inputProps}
      />
      {hasError && <p className="text-destructive text-sm">{errorMessage}</p>}
    </div>
  );
};
