import { APP_INITIALIZER, NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { from } from '@apollo/client/core';
import { HttpBatchLink } from 'apollo-angular/http';
import { graphQLProviders, CACHE_TOKEN, KNOWN_QUERIES_TOKEN } from './graphql.providers';
import { cache, createNetworkLink, createRegisterQueryLink, httpUrl, omitTypenameLink } from 'app/config/apollo-client';
import { PubSub } from 'app/core/util/pub-sub';
import { GraphQLCacheService } from './graphql.cache.service';

const sub = new PubSub<string>();

const registerQueryLink = createRegisterQueryLink(sub);

export function createApollo(httpLink: HttpBatchLink): any {
  const networkLink = createNetworkLink(httpLink.create({ uri: httpUrl }));
  return {
    link: from([omitTypenameLink, registerQueryLink, networkLink]),
    cache,
    defaultOptions: {},
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpBatchLink],
    },
    {
      provide: CACHE_TOKEN,
      useValue: cache,
    },
    {
      provide: KNOWN_QUERIES_TOKEN,
      useValue: sub,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (graphQLCacheService: GraphQLCacheService) => () => graphQLCacheService.connect(),
      deps: [GraphQLCacheService],
      multi: true,
    },
    graphQLProviders,
  ],
})
export class GraphQLModule {}
