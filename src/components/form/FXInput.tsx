"use client";
import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  defaultValue,
  isDisabled
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      variant={variant}
      size={size}
      required={required}
      defaultValue={defaultValue}
      type={type}
      label={label}
      isDisabled={isDisabled}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
    />
  );
};

export default FXInput;
