import { AllBooksResponse } from './book.types'

export interface AuthorsDataState {
  [key: string]: {
    title: string;
    url: string;
  };
}

export interface RootState {
  booksData: AllBooksResponse;
  authorsData: AuthorsDataState;
}

// Action types
export interface SetBooksDataAction {
  type: string;
  payload: AllBooksResponse;
}

export interface SetAuthorsDataAction {
  type: string;
  payload: AuthorsDataState;
}
