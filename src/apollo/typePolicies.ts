import { Book } from '@/types/book.types';
import { FieldPolicy } from '@apollo/client';

interface BookResponse {
  total: number;
  items: Book[];
  __typename: string;
}

export const typePolicies = {
  Query: {
    fields: {
      all_book: {
        keyArgs: ['where'],
        merge(existing: BookResponse | undefined, incoming: BookResponse, { args }): BookResponse {
          if (args?.where) {
            return incoming;
          }

          if (!args?.skip) {
            return incoming;
          }

          return {
            total: incoming.total,
            items: existing ? [...existing.items, ...incoming.items] : incoming.items,
            __typename: incoming.__typename,
          };
        },
      } satisfies FieldPolicy<BookResponse>,
    },
  },
};
