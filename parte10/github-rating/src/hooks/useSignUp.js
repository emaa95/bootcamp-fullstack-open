import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {

  const [mutate, { data, error }] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: { user: { username, password } } });
      return { data }
    } catch (mutationError) {
      console.error('Error during creation user:', mutationError);
    }
  };

  return [createUser, { data, error }];
};

export default useCreateUser;