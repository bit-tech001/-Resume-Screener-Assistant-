
export interface AuthFormErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

export interface AuthFormValues {
  errors?: AuthFormErrors;
  message?: string;
}

export type AuthFormState = AuthFormValues | undefined;
