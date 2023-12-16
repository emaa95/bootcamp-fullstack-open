import React from 'react';
import { Formik, useField } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import { loginValidationSchema } from '../validationSchemas/login';
import Text from '../components/StyledText';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  email: '',
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
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { email, password } = values;
    console.log('press');

    try {
      await signIn({ username: email, password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
    {
        ({ handleSubmit }) => {
          return <View style={styles.form}>
            <FormikInputValue
                name='email'
                placeholder='E-mail'
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
