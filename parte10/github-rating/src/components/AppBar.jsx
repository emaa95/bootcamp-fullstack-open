import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './StyledText';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, useLocation } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.navBarBackground,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 10
  },
  scroll: {
    paddingBottom: 20
  },
  active: {
    color: theme.appBar.textPrimary
  }
});

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  const textStyles = [
    styles.text,
    active && styles.active
  ];

  return (
        <Link to={to}>
            <Text fontSize="title" fontWeight='bold' style={ textStyles }>
                {children}
            </Text>
        </Link>
  );
};

const AppBar = () => {
  return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <AppBarTab to='/'>Repositories</AppBarTab>
                <AppBarTab to='/signin'>Sign In</AppBarTab>
            </ScrollView>
        </View>
  );
};

export default AppBar;
