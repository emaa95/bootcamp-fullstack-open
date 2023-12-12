import React from 'react';
import { Text, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={() => <Text> </Text>}
          renderItem={({ item: repo }) => (
            <RepositoryItem {...repo}/>
          )
          }
        >
        </FlatList>
  );
};

export default RepositoryList;
