import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();

export default function App () {
  console.log(Constants.expoConfig);

  return (
    <View>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main/>
        </ApolloProvider>
      </NativeRouter>
    </View>
  );
}
