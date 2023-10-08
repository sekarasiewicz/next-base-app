"use client";

import Header from "@/app/components/Header";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo";

export const PageLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <ApolloProvider  client={apolloClient}>
      <Header/>
      {children}
    </ApolloProvider>
  );
};
