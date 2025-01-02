import { AssetConnection, JsonContent } from './common.types';
import { Book } from './book.types';

export type AllAuthorsResponse = {
  all_author: {
    items: Author[];
  };
};

export type Author = {
  title: string;
  imageConnection: AssetConnection;
  description: AuthorDescription;
  additional_sections: AuthorAdditionalSection[];
};

export type AuthorDescription = {
  json: JsonContent;
};

export type AuthorAdditionalSection =
  | AuthorAdditionalSectionPopularBooks
  | AuthorAdditionalSectionOtherAuthors;

export type AuthorAdditionalSectionPopularBooks = {
  popular_books: {
    books: PopularBook[];
  };
};

export type PopularBook = {
  bookConnection: {
    edges: PopularBookEdge[];
  };
};

export type PopularBookEdge = {
  node: Book;
};

export type BookAuthor = {
  title: string;
  url: string;
};

export type AuthorAdditionalSectionOtherAuthors = {
  other_authors: {
    authors_list: OtherAuthor[];
  };
};

export type OtherAuthor = {
  author_itemConnection: {
    edges: OtherAuthorEdge[];
  };
};

export type OtherAuthorEdge = {
  node: OtherAuthorNode;
};

export type OtherAuthorNode = {
  title: string;
  url: string;
  imageConnection: AssetConnection;
};
