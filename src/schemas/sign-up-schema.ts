import { object, string, ref } from 'yup';

import { FIELD_IS_REQUIRED, getMinLengthErrorMessage } from '@constants';

export const signUpValidationSchema = object({
  username: string()
    .transform((value) => (value ? value.trim() : value))
    .min(4, getMinLengthErrorMessage(4))
    .required(FIELD_IS_REQUIRED),
  email: string()
    .transform((value) => (value ? value.trim() : value))
    .min(10, getMinLengthErrorMessage(10))
    .required(FIELD_IS_REQUIRED),
  // TODO: обновить длину пароля
  password: string().min(4, getMinLengthErrorMessage(4)).required(FIELD_IS_REQUIRED),
  passwordConfirm: string()
    .min(4, getMinLengthErrorMessage(4))
    .required(FIELD_IS_REQUIRED)
    .oneOf([ref('password')], 'Password and confirmation password do not match'),
});
