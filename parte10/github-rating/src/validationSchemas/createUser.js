import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(1, 'Username too short').max(30, 'Username too long'),
  password: yup.string().min(5, 'Password too short').max(30, 'Password too long').required('Password is required'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Password confirmation is required')
});