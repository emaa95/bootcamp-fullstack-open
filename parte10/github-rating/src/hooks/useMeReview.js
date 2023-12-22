import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { Text } from "react-native";

const useMeReview = () => {
    const { loading, data, error, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    });

    if (loading) return <div>Loading...</div>;

    if (error) {
        console.log('meReviewError', error);
        return <Text>Error</Text>;
      }

    console.log('meReview', data?.me.reviews)

    return { reviews: data?.me.reviews, refetch };
};

export default useMeReview;