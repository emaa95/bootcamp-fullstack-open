import { useMutation } from "@apollo/client"

import { DELETE_REVIEW } from "../graphql/mutations"

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW)
    console.log('deletereviewresult', result)

    const deleteReview = async({deleteReviewId}) => {
        try {
            const { data } = await mutate({ variables: { deleteReviewId } });
            return { data };
          } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
          }
    }

    return [deleteReview, result]
}

export default useDeleteReview;