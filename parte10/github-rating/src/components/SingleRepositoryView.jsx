import RepositoryItem from '../components/RepositoryItem';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import useSingleRepository from '../hooks/useSingleRepository';
import { StyleSheet, Pressable, View, FlatList } from 'react-native';
import theme from '../theme';
import Text from './StyledText';

const styles = StyleSheet.create({ 
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 55

    },
    infoContainer: {
        flexGrow: 1
    },  
    gitHubContainer: {
        marginTop: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        minWidth: "85%",
        alignSelf:"center",
    },
    gitHubText:{
        color: theme.colors.fontColor,
        alignSelf: "center",
        padding:15,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.bold
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    rating: {
        color: theme.colors.primary
    },
    date: {
        marginVertical: 10
    },
    text: {
        marginRight: 30,
        fontFamily: theme.fonts.main
    },
})

const RepositoryInfo = ({ repository }) => {
    const pressHandle = () => Linking.openURL(repository.url)

    return (
        <>
            <RepositoryItem           
            {...repository}
            >
            </RepositoryItem>
            <Pressable onPress={pressHandle} style={styles.gitHubContainer}>
                <Text style={styles.gitHubText}>Open in gitHub</Text>
            </Pressable>
        </>
    )
};
  
const ReviewItem = ({ review }) => {
  
    const createdAtDate = new Date(review.createdAt);
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1; 
    const year = createdAtDate.getFullYear();

    const date = `${day}.${month}.${year}`;
    
    return (
    <View style={styles.container}>
        <View style={styles.ratingContainer}>
            <Text fontWeight={"bold"} fontSize={"title"} style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text fontSize={"title"} fontWeight={"bold"}>{review.user.username}</Text>
            <Text fontSize={"body"} color={"textSecondary"} style={styles.date}>{date}</Text>
            <Text style={styles.text}>{review.text}</Text>
        </View>
    </View>
    )
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
    const { id } = useParams();
    const { repository, fetchMore } = useSingleRepository(id, 4);

    console.log('repositoryId', id)
    
    const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node) 
    : null

    const onEndReach = () => {
        fetchMore()
    }

    return (
        
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryInfo repository={repository}
          />}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
       
      );
    
}

export default SingleRepositoryView;