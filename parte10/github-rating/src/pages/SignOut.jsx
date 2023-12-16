import { useApolloClient } from '@apollo/client';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-native';
import AuthStorageContext from '../context/AuthStorageContext';

export default function SignOut () {
  const authStorage = useContext(AuthStorageContext);

  const apolloClient = useApolloClient();

  const navigate = useNavigate();

  useEffect(() => {
    async function signOut () {
      await authStorage.removeAccessToken();

      await apolloClient.resetStore();

      navigate('/');
    }

    signOut();
  }, []);

  return null;
}
