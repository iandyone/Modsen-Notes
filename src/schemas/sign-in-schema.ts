import { object, string } from 'yup';

import { FIELD_IS_REQUIRED, getMinLengthErrorMessage } from '@constants';

export const signInValidationSchema = object({
  email: string()
    .transform((value) => (value ? value.trim() : value))
    .min(10, getMinLengthErrorMessage(10))
    .required(FIELD_IS_REQUIRED),
  password: string().min(4, getMinLengthErrorMessage(4)).required(FIELD_IS_REQUIRED),
});
