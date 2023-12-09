import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5, 'Too short').max(30, 'Too long').required()
});
