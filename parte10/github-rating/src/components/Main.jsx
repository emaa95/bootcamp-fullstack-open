import React from 'react';
import { Text, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import AppBar from './AppBar';

const Main = () => {
  return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>Rate Repositorty Application</Text>
          <AppBar></AppBar>

          <RepositoryList/>
        </View>
  );
};

export default Main;
