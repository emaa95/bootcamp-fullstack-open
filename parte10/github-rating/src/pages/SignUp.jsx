import React from 'react';
import { Formik, useField } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import { userValidationSchema } from '../validationSchemas/createUser';
import Text from '../components/StyledText';
import { useNavigate } from 'react-router-native';
import useCreateUser from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
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

export default function SignUp () {
    const [createUser, { error} ] = useCreateUser();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;
        console.log('press')

        try {
            const {data} = await createUser({ username, password });
            console.log('signUp: ', data)
            await signIn({username, password}) 
            navigate('/');
            if (data) {
                console.log('Registro de usuario existoso:', data);
              }
              if (error) {
                console.log('Error durante el registro de usuario:', error);
              }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={userValidationSchema} onSubmit={onSubmit}>
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
                <FormikInputValue
                    name='passwordConfirm'
                    placeholder='Password confirmation'
                    secureTextEntry
                />
                <Button onPress={handleSubmit} title='Sign up' />
                </View>;
                } 
            }
        </Formik>
    )
}