import React, { useState } from 'react';
import { Text, FlatList, StyleSheet, View, Platform } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({ 
    pickerOrder:{
      marginBottom: 10,
      marginTop: Platform.OS === 'ios' ? -50 : 10
    },
    search: {
      marginVertical: 10,
      borderRadius: 10,
      marginHorizontal:5,
      backgroundColor: '#e1e4e8'
    }
})

export const RepositoryListContainer = ({ repositories, order, setOrder, searchKeyword, setSearchKeyword }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchKeyword(query)}
        value={searchKeyword}
        style={styles.search}
        theme={{ colors: { primary: 'blue' } }}
      />
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
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ searchKeyword ] = useDebounce(searchQuery, 50);

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

  const { repositories } = useRepositories(orderBy, orderDirection, searchKeyword);

  console.log('t', orderBy, orderDirection, order)

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} searchKeyword={searchKeyword}
  setSearchKeyword={setSearchQuery}/>;

}

export default RepositoryList;
