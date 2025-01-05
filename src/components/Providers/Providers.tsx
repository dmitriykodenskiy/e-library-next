'use client';

import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/apollo/client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={getClient()}>
      {children}
    </ApolloProvider>
  );
}
