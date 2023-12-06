import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontSizeAppBar: {
    fontSize: theme.fontSizes.title
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  textAlignCenter: {
    textAlign: 'center'
  }
});

const Text = ({ align, color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'title' && styles.fontSizeAppBar,
    fontWeight === 'bold' && styles.fontWeightBold,
    align === 'center' && styles.textAlignCenter,
    style
  ];

  return <NativeText style={textStyle} {...props}/>;
};

export default Text;
