import { gql } from '@apollo/client';
import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
  query {
    me {
      id
      username
    }
  }
`;

export const SINGLE_REPOSITORY = gql`
query Repository($id: ID!){
  repository(id: $id) {
    ...RepoDetails
    url
    reviews {
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
      }
    }
  }
}
${REPO_DETAILS}
`