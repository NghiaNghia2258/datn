import React, { createContext, useCallback, useContext, useState } from "react";
import { z, ZodNumber } from "zod";

type ValidationErrors<T> = Partial<Record<keyof T, string>>;
type FormDataType<T> = Partial<T>;

interface ValidationContextProps<T> {
  formData: FormDataType<T>;
  setFormData: (value: T) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  validationErrors: ValidationErrors<T>;
  setValidationErrors: (errors: ValidationErrors<T>) => void;
  clearValidationErrors: () => void;
  setSchema: (schema: z.ZodObject<any>) => void;
  getFieldValidator: <K extends keyof T>(
    fieldName: K
  ) => (value: T[K]) => string | null;
  validateForm: () => boolean;
}

const ValidationContext = createContext<
  ValidationContextProps<any> | undefined
>(undefined);

export const ValidationProvider = <T,>({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<FormDataType<T>>({});
  const [validationErrors, setErrors] = useState<ValidationErrors<T>>({});
  const [schema, setSchema] = useState<z.ZodObject<any> | null>(null);

  const validateForm = (): boolean => {
    if (!schema) return false;

    const result = schema.safeParse(formData);
    if (result.success) return false;

    const formattedErrors = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).map(
        ([key, errors]) => [key, errors ? errors[0] : ""]
      )
    ) as ValidationErrors<T>;

    setErrors(formattedErrors);
    return true;
  };
  const setFieldValue: ValidationContextProps<T>["setFieldValue"] = useCallback(
    (field, value) => {
      let parsedValue = value as any;
      if (schema) {
        let fieldSchema = schema.shape[field as string];
        if (fieldSchema._def?.innerType) {
          fieldSchema = fieldSchema._def.innerType;
        }
        if (fieldSchema instanceof ZodNumber) {
          const numberValue = Number(value);
          parsedValue = isNaN(numberValue) ? value : numberValue;
        }

        if (fieldSchema) {
          const result = fieldSchema.safeParse(parsedValue);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: result.success
              ? undefined
              : result.error.errors[0].message,
          }));
        }
      }
      setFormData((prev) => ({
        ...prev,
        [field]: parsedValue,
      }));
    },
    [schema]
  );
  const setValidationErrors: ValidationContextProps<T>["setValidationErrors"] =
    (errors) => {
      setErrors(errors);
    };

  const clearValidationErrors: ValidationContextProps<T>["clearValidationErrors"] =
    () => {
      setErrors({});
    };

  const getFieldValidator: ValidationContextProps<T>["getFieldValidator"] = (
    fieldName
  ) => {
    return (value) => {
      if (!schema) return null;
      const fieldSchema = schema.shape[fieldName as string]; // Ép kiểu an toàn
      if (!fieldSchema) return null;

      const result = fieldSchema.safeParse(value);
      return result.success ? null : result.error.errors[0].message;
    };
  };

  return (
    <ValidationContext.Provider
      value={{
        setFormData,
        formData,
        setFieldValue,
        validationErrors,
        setValidationErrors,
        clearValidationErrors,
        setSchema,
        getFieldValidator,
        validateForm,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = <T,>() => {
  const context = useContext(ValidationContext) as ValidationContextProps<T>;
  if (!context) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};
