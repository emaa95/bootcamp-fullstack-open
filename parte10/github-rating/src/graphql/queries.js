import { gql } from '@apollo/client';
import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection,$searchKeyword: String){
    repositories (orderBy: $orderBy, orderDirection: $orderDirection,searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            createdAt
            rating
            text
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;

export const SINGLE_REPOSITORY = gql`
query Repository($id: ID!, $first: Int, $after: String){
  repository(id: $id) {
    ...RepoDetails
    url
    reviews(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor,
        startCursor,
        hasNextPage
      }
      
    }
    
  }
}
${REPO_DETAILS}
`