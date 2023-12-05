import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5
  }
});

const RepositoryItem = (props) => (
    <View key = {props.id} style={styles.container}>
                <Text>{props.id}</Text>
                <Text>{props.fullName}</Text>
                <Text>{props.description}</Text>
                <Text>{props.language}</Text>
                <Text>{props.forksCount}</Text>
                <Text>{props.stargazersCount}</Text>
                <Text>{props.ratingAverage}</Text>
                <Text>{props.reviewCount}</Text>
                <Text>{props.ownerAvatarUrl}</Text>
            </View>
);

export default RepositoryItem;
