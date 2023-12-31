import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    navBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    fontColor: '#FFFFFF',
    primary: '#0366d6',
    error: '#FF0000'
  },
  fontSizes: {
    title: 20,
    body: 14,
    subheading: 16
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  appBar: {
    textPrimary: '#FFFFFF',
    textSecondary: '#586069'
  }
};

export default theme;
