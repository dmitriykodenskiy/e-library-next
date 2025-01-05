import { gql } from '@apollo/client';

export const HEADER = gql`
  query {
    all_header {
      items {
        title
        home_link {
          href
        }
      }
    }
  }
`;
export const ALL_BOOKS = gql`
  query AllBooks($skip: Int, $limit: Int) {
    all_book(limit: $limit, skip: $skip) {
      total
      items {
        number_of_pages
        short_description
        title
        rating
        link {
          href
          title
        }
        imageConnection {
          edges {
            node {
              title
              url
            }
          }
        }
        authorrefConnection {
          edges {
            node {
              ... on Author {
                title
                url
                system {
                  uid
                }
              }
            }
          }
        }
        system {
          uid
        }
      }
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: String!) {
    all_book(where: { uid: $id }) {
      total
      items {
        number_of_pages
        short_description
        title
        rating
        link {
          href
          title
        }
        imageConnection {
          edges {
            node {
              url
            }
          }
        }
        authorrefConnection {
          edges {
            node {
              ... on Author {
                title
                url
              }
            }
          }
        }
        system {
          uid
        }
      }
    }
  }
`;
export const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($uid: String!) {
    all_author(where: { uid: $uid }) {
      items {
        title
        imageConnection {
          edges {
            node {
              url
            }
          }
        }
        description {
          json
        }
      }
    }
  }
`;
