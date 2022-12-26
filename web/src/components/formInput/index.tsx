import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormInputProps = {
  name: string;
} & TextFieldProps;

/**
 *
 * @param param0
 * @returns
 */
const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name]?.message?.toString() : ""}
        />
      )}
    />
  );
};

export default FormInput;
