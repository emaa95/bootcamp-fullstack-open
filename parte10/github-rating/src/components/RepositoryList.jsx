import React, { useState } from 'react';
import { Text, FlatList, StyleSheet, View, Platform } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
const styles = StyleSheet.create({ 
    pickerOrder:{
      marginBottom: 10,
      marginTop: Platform.OS === 'ios' ? -50 : 10
    }
})

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View>
      <Picker style={styles.pickerOrder} selectedValue={order} onValueChange={(itemValue) => setOrder(itemValue)}>
        <Picker.Item label='Latest repositories' value='latest'/>
        <Picker.Item label='Highest rated repositories' value='highestRated'/>
        <Picker.Item label='Lowest rated repositories' value='lowestRated'/>
      </Picker>
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
    </View>
  );
};

const RepositoryList = () => {
  
  const [ order, setOrder] = useState('latest');


  let orderBy;
  let orderDirection;

  switch(order) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    
    case 'highestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    
    case 'lowestRated':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break
  }

  const { repositories } = useRepositories(orderBy, orderDirection);

  console.log('t', orderBy, orderDirection, order)

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>;

}

export default RepositoryList;
