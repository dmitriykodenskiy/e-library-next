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
export const ALL_AUTHORS = gql`
  query AllBooks($url: String) {
    all_author(where: { url: $url }) {
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
        additional_sections {
          ... on AuthorAdditionalSectionsPopularBooks {
            __typename
            popular_books {
              books {
                bookConnection {
                  edges {
                    node {
                      ... on Book {
                        title
                        url
                        number_of_pages
                        rating
                        short_description
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
                        link {
                          href
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on AuthorAdditionalSectionsOtherAuthors {
            __typename
            other_authors {
              authors_list {
                author_itemConnection {
                  edges {
                    node {
                      ... on Author {
                        title
                        url
                        imageConnection {
                          edges {
                            node {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
