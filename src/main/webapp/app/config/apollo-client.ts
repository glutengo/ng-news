import { WebSocketLink } from '@apollo/client/link/ws';
import { InMemoryCache, ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { PubSub } from 'app/core/util/pub-sub';

export const httpUrl = '/graphql';
export const wsUrl = getWSUrl(httpUrl);
const AUTHENTICATION_TOKEN_KEY = 'jhi-authenticationToken';

function getWSUrl(url: string): string {
  const parsedURL = new URL(url, document.baseURI);
  parsedURL.protocol = parsedURL.protocol === 'https' ? 'wss' : 'ws';
  return parsedURL.toString();
}

function getToken(): string {
  return (localStorage.getItem(AUTHENTICATION_TOKEN_KEY) ?? sessionStorage.getItem(AUTHENTICATION_TOKEN_KEY) ?? '').replace(/"/g, '');
}

function getAuthorizationHeader(): string {
  const token = getToken();
  return token ? `Bearer ${token}` : '';
}

// remove accidentally passed __typename property from variables
export const omitTypenameLink = new ApolloLink((operation, forward) => {
  operation.variables = JSON.parse(JSON.stringify(operation.variables), (key: string, value: string) =>
    key === '__typename' ? undefined : value
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return forward(operation);
});

// track all queries for caching
export function createRegisterQueryLink(pubsub: PubSub<string> = new PubSub<string>()): ApolloLink {
  return new ApolloLink((op, forward) => {
    const { operation, selectionSet } = getMainDefinition(op.query) as any;
    if (operation === 'query') {
      pubsub.publish(selectionSet.selections[0].name.value);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return forward(op);
  });
}

// add authentication token
export const authLink = setContext((op, { headers }) => ({
  headers: {
    ...headers,
    authorization: getAuthorizationHeader(),
  },
}));

// split network layer: use webSocket for subscriptions and http for anything else
export function createNetworkLink(httpLink: ApolloLink): ApolloLink {
  return split(
    op => {
      const { kind, operation } = getMainDefinition(op.query) as any;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    new WebSocketLink({
      uri: wsUrl,
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
          headers: { authorization: getAuthorizationHeader() },
        }),
      },
    }),
    httpLink
  );
}

export const cache = new InMemoryCache({ addTypename: false });
0;
