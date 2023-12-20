import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {

  const [mutate, { data, error }] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    try {
      const { data } = await mutate({ variables: { review: { ownerName, rating: Number(rating), repositoryName, text } } });
      return { data }
    } catch (mutationError) {
      console.error('Error during creation review:', mutationError);
    }
  };

  return [createReview, { data, error }];
};

export default useCreateReview;