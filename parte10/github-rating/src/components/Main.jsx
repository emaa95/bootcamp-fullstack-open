import React from 'react';
import { Text, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import AppBar from './AppBar';
import { Route, Routes, Switch } from 'react-router-native';
import LoginPage from '../pages/Login';

const Main = () => {
  return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>Rate Repositorty Application</Text>
          <AppBar></AppBar>
          <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='/signin' element={<LoginPage></LoginPage>} />
          </Routes>
        </View>
  );
};

export default Main;
