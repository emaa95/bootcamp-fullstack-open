import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id, first) => {
    const { data, loading, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id, first }
    });

    console.log('useSingleRepositoryid', id)

    const handleFetchMore = () => {
      const canFetchMore =
        !loading && data?.repository.reviews.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }

      fetchMore({
        variables: {
          id, 
          first,
          after: data.repository.reviews.pageInfo.endCursor
        }
      })
    }
    
    return { 
      repository: data?.repository,
      fetchMore: handleFetchMore,
      loading,
      ...result
    }
}

export default useSingleRepository;