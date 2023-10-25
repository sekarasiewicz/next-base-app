"use client";

import { gql, useQuery } from "@apollo/client";
import type { Link } from "@prisma/client";
import {AwesomeLink} from "@/app/components/AwesomeLink";
import {__DEV__} from "@apollo/client/utilities/globals";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const AllLinksQuery = gql`
    query allLinksQuery($first: Int, $after: ID) {
        links(first: $first, after: $after) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    imageUrl
                    url
                    title
                    category
                    description
                    id
                }
            }
        }
    }
`;

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 2 },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data.links.pageInfo;

  return (
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }: { node: Link }) => (
            <AwesomeLink
              key={node.id}
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You&apos;ve reached the end!{" "}
          </p>
        )}
      </div>
  );
}
