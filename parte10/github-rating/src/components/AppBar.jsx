import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './StyledText';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.navBarBackground,
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  text: {
    color: theme.colors.fontColor
  }
});

const AppBar = () => {
  return (
        <View style={styles.container}>
            <Text fontSize="title" fontWeight='bold' style={ styles.text }>
                Repositories
            </Text>
        </View>
  );
};

export default AppBar;
