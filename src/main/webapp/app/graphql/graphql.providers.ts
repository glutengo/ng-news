import { Provider, InjectionToken } from '@angular/core';
import { PubSub } from 'app/core/util/pub-sub';
import { InMemoryCache } from '@apollo/client/core';
import { UserService } from 'app/entities/user/user.service';
import { UserGraphQLService } from 'app/entities/user/user.gql.service';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { PostService } from 'app/entities/post/service/post.service';
import { PostGraphQLService } from 'app/entities/post/service/post.gql.service';
import { CategoryService } from 'app/entities/category/service/category.service';
import { CategoryGraphQLService } from 'app/entities/category/service/category.gql.service';

export const graphQLProviders: Provider[] = [
  { provide: UserService, useClass: UserGraphQLService },
  { provide: UserManagementService, useClass: UserGraphQLService },
  { provide: PostService, useClass: PostGraphQLService },
  { provide: CategoryService, useClass: CategoryGraphQLService },
];

export const CACHE_TOKEN = new InjectionToken<InMemoryCache>('CACHE');
export const KNOWN_QUERIES_TOKEN = new InjectionToken<PubSub<string>>('KNOWN_QUERIES');
