import React from 'react';
import { Text, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';

export const RepositoryListContainer = ({ repositories }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={() => <Text> </Text>}
          renderItem={({ item: repo }) => (
            <Link to={`/${repo.id}`}>
            <RepositoryItem {...repo}/>
            </Link>
          )
          }
        >
        </FlatList>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories}/>;
}

export default RepositoryList;
