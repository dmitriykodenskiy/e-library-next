import { AssetConnection, Link } from './common.types';
import { Author } from './author.types';

export type AllBooksResponse = {
  all_book: {
    total: number;
    items: Book[];
  };
};

export type BookByIdResponse = AllBooksResponse;

export type Book = {
  number_of_pages: number;
  short_description: string;
  title: string;
  rating: number;
  link: Link;
  imageConnection: AssetConnection;
  authorrefConnection: BookAuthorrefConnection;
  system: {
    uid: string;
  };
};

export type BookAuthorrefConnection = {
  edges: BookAuthorrefEdge[];
};

export type BookAuthorrefEdge = {
  node: Author;
};
