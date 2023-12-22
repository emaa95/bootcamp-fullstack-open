import React from 'react'
import  useMeReview  from '../hooks/useMeReview'
import { FlatList, View, StyleSheet } from 'react-native';
import Text from './StyledText';
import theme from '../theme';

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

const MeReviewItem = ({ review, refetch }) => {
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
            <Text fontSize={"title"} fontWeight={"bold"}>{review.repository.fullName}</Text>
            <Text fontSize={"body"} color={"textSecondary"} style={styles.date}>{date}</Text>
            <Text style={styles.text}>{review.text}</Text>
        </View>
    </View>
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