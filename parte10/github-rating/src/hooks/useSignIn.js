import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../context/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, { data, error }] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({ variables: { credentials: { username, password } } });
      const accessToken = result.data?.authenticate?.accessToken;
      if (accessToken) {
        await authStorage.setAccessToken(accessToken);

        apolloClient.resetStore();
      }
    } catch (mutationError) {
      console.error('Error during authentication:', mutationError);
    }
  };

  return [signIn, { data, error }];
};

export default useSignIn;
