import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

export default function App () {
  return (
    <View>
      <NativeRouter>
        <Main/>
      </NativeRouter>
    </View>
  );
}
