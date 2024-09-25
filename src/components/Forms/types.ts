export interface SignInState {
  email: string;
  password: string;
}

export interface SignUpState extends SignInState {
  username: string;
  passwordConfirm: string;
}

export interface SignInFormProps {
  className?: string;
}
