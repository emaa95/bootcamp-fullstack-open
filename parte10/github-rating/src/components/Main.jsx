import React from 'react';
import { Text, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Constants from 'expo-constants';
import AppBar from './AppBar';
import { Route, Routes } from 'react-router-native';
import LoginPage from '../pages/Login';
import SignOut from '../pages/SignOut';
import SignUp from '../pages/SignUp';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const Main = () => {
  return (
        <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
          <Text>Rate Repositorty Application</Text>
          <AppBar></AppBar>
          <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='/signin' element={<LoginPage></LoginPage>} />
          <Route path='/signout' element={<SignOut></SignOut>}></Route>
          <Route path='/:id' element={<SingleRepositoryView/>}></Route>
          <Route path='/createReview' element={<CreateReview></CreateReview>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/myReviews' element={<MyReviews></MyReviews>}></Route>
          </Routes>
        </View>
  );
};

export default Main;
