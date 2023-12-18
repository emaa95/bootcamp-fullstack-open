import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './StyledText';
import RepositoryStats from './RepositoryStats';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5
  },
  language: {
    padding: 4,
    color: theme.colors.fontColor,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 5
  }
});

const RepositoryItemHeader = (props) => (
  <View style ={{ flexDirection: 'row', paddingBottom: 2 }}>
      <View style={{ paddingLeft: 10 }}>
        <Image style= {styles.image} source={{ uri: props.ownerAvatarUrl }}></Image>
      </View>
      <View style= {{ flex: 1, paddingLeft: 10 }}>
        <Text fontWeight="bold" fontSize="subheading" >{props.fullName}</Text>
        <Text color="textSecondary">{props.description}</Text>
        <Text style={styles.language}>{props.language}</Text>
      </View>
  </View>
);

const RepositoryItem = (props) => (
    <View key = {props.id} style={styles.container} testID='repositoryItem'>
      <RepositoryItemHeader {...props}/>
      <RepositoryStats {...props}/>
    </View>
);

export default RepositoryItem;
