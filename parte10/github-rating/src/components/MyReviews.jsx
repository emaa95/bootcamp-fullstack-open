import React from 'react'
import  useMeReview  from '../hooks/useMeReview'
import { FlatList, View, StyleSheet, Alert, Pressable } from 'react-native';
import Text from './StyledText';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';


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
    buttonsContainer: {
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 55
    },
    buttons: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    buttonView: {
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonDelete: {
        backgroundColor: theme.colors.error,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textButton: {
        color: theme.colors.fontColor
    }
})

const MeReviewItem = ({ review, refetch }) => {
    const [deleteReview] = useDeleteReview()
    const navigate = useNavigate();

    const createdAtDate = new Date(review.createdAt);
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1; 
    const year = createdAtDate.getFullYear();

    const date = `${day}.${month}.${year}`;

    const handleDelete = () => {
        Alert.alert(
            'Delete Review',
            'Are you sure you want to delete this review?',
            [ 
                { 
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed')
                },
                {
                    text: 'Delete',
                    onPress: async() => {
                        try {
                            if (!review.id) {
                                console.error('Invalid review ID');
                                return;
                              }
                            await deleteReview({ deleteReviewId: review.id });
                            await refetch();
                        } catch (error) {
                            console.error('Error deleting review:', error);
                            Alert.alert('Error', `Error deleting review: ${error.message}`);
                        }
                    }
                }
            ]
            )
    }

    return (
        <>
        <View style={styles.container}>
        <View style={styles.ratingContainer}>
            <Text fontWeight={"bold"} fontSize={"title"} style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text fontSize={"title"} fontWeight={"bold"}>{review.repository.fullName}</Text>
            <Text fontSize={"body"} color={"textSecondary"} style={styles.date}>{date}</Text>
            <Text style={styles.text}>{review.text}</Text>
        </View>
        </View>
        <View style={styles.buttonsContainer}> 
            <View style={styles.buttons}>
            <Pressable style={styles.buttonView} onPress={()=> navigate(`/${review.repositoryId}`) }>
                <Text fontWeight={"bold"} style={styles.textButton}>View repository</Text>
            </Pressable>
            <Pressable style={styles.buttonDelete} onPress={handleDelete}>
                <Text fontWeight={"bold"} style={styles.textButton}>Delete review</Text>
            </Pressable>
            </View>
        </View>
     
        </>
    )

}

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => { 
    const { reviews, refetch } = useMeReview()
    const myReviews = reviews
        ? reviews.edges.map(edge => edge.node)
        : null
        
    return (
        <>
            <FlatList
                data = {myReviews}
                renderItem={({item})=> <MeReviewItem review={item} refetch={refetch}/>}
                ItemSeparatorComponent={ItemSeparator}
            />
        </>
    )
}

export default MyReviews;