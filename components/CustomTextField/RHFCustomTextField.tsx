import { Controller, useFormContext } from "react-hook-form";
import { CustomTextField } from "@/components";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    onValueChange?: (value: any) => void; // optional callback
}

const RHFCustomTextField = ({
    name,
    label,
    placeholder,
    disabled,
    onValueChange,
}: Props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <CustomTextField
                        inputLabel={label}
                        placeholder={placeholder}
                        value={field.value ?? ""}
                        onChange={(e: any) => {
                            field.onChange(e.target.value);
                            onValueChange?.(e.target.value);
                        }}
                        disabled={disabled}
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string}
                    />
                )
            }}
        />
    );
};

export default RHFCustomTextField;
