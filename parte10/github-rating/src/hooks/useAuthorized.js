import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries.js';

const useAuthorizedUser = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });

  // const isAuthorized = data !== undefined && data.authorizedUser !== null;

  const isAuthorized = data !== undefined && data !== null && data.me !== null;

  return {
    isAuthorized
  };
};

export default useAuthorizedUser;
