import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(5, 'Password too short').max(30, 'Password too long').required('Password is required')
});
