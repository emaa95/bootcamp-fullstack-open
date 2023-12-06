import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './StyledText';

const parseThousands = value => {
  return value >= 1000
    ? `${Math.round(value / 100) / 10}k`
    : String(value);
};

const RepositortyStats = props => {
  return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
              <Text align='center' color='textSecondary'>Stars</Text>
              <Text align='center' fontWeight="bold">{parseThousands(props.stargazersCount)}</Text>
          </View>
          <View>
              <Text align='center' color='textSecondary'>Forks</Text>
              <Text align='center' fontWeight="bold">{parseThousands(props.forksCount)}</Text>
          </View>
          <View>
              <Text align='center' color='textSecondary'>Reviews</Text>
              <Text align='center' fontWeight="bold">{props.reviewCount}</Text>
          </View>
          <View>
              <Text align='center' color='textSecondary'>Rating</Text>
              <Text align='center' fontWeight="bold">{props.ratingAverage}</Text>
          </View>
      </View>
  );
};

export default RepositortyStats;
