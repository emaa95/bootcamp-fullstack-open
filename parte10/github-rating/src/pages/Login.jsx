import React, { useEffect } from 'react';
import { Formik, useField } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import { loginValidationSchema } from '../validationSchemas/login';
import Text from '../components/StyledText';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5
  },
  form: {
    margin: 12
  }
});

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
        <StyledTextInput
            value={field.value}
            onChangeText={value => helpers.setValue(value)}
            error = {meta.error}
            {...props}
        />
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
    </>
  );
};

export default function LoginPage () {
  const [signIn, { data, error }] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log('press');

    try {
      await signIn({ username, password });
      navigate('/');
      if (data) {
        console.log('Ingreso existoso:', data);
      }
      if (error) {
        console.log('Error durante el inicio de sesión:', error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (data) {
      console.log('Ingreso exitoso:', data);
    }

    if (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  }, [data, error]);

  return (
    <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
    {
        ({ handleSubmit }) => {
          return <View style={styles.form}>
            <FormikInputValue
                name='username'
                placeholder='Username'
            />
            <FormikInputValue
                name='password'
                placeholder='Password'
                secureTextEntry
            />
            <Button onPress={handleSubmit} title='Log In' />
          </View>;
        }
    }
    </Formik>
  );
}
