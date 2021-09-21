import { Inject, Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Subscribable } from 'app/core/util/pub-sub';
import { AlertService } from 'app/core/util/alert.service';
import { CACHE_TOKEN, KNOWN_QUERIES_TOKEN } from './graphql.providers';
import { GraphQLCacheWatcher } from 'app/core/util/graphql-cache-watcher';

@Injectable({ providedIn: 'root' })
export class GraphQLCacheService {
  private cacheWatcher: GraphQLCacheWatcher;

  constructor(
    @Inject(KNOWN_QUERIES_TOKEN)
    private knownQueries: Subscribable<string>,
    @Inject(CACHE_TOKEN)
    private cache: InMemoryCache,
    private apollo: Apollo,
    private alert: AlertService
  ) {
    this.cacheWatcher = new GraphQLCacheWatcher(this.apollo.client, this.cache, this.knownQueries, entity =>
      this.alert.addAlert({ type: 'info', message: `Data for ${entity} has changed. Please Refresh to see the changes.` })
    );
  }

  connect(): void {
    this.cacheWatcher.connect();
  }
}
