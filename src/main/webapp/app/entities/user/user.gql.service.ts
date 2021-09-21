import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'app/core/request/request.model';
import { GraphQLUtils } from 'app/core/util/graphql-util.service';
import { GetAuthoritiesGQL, GetUserGQL, GetUsersGQL, CreateUserGQL, DeleteUserGQL, UpdateUserGQL } from './user.gql';
import { IUser } from 'app/admin/user-management/user-management.model';
import { isPresent } from 'app/core/util/operators';
import { getUserIdentifier } from './user.model';
import { CreateUserArgs, UpdateUserArgs } from 'app/graphql';

export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class UserGraphQLService {
  constructor(
    private graphQLUtils: GraphQLUtils,
    private getAuthoritiesGQL: GetAuthoritiesGQL,
    private getUsersGQL: GetUsersGQL,
    private getUserGQL: GetUserGQL,
    private createUserGQL: CreateUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private deleteUserGQL: DeleteUserGQL
  ) {}

  query(req?: Pagination): Observable<EntityArrayResponseType> {
    return this.getUsersGQL
      .fetch(this.graphQLUtils.createGraphQlOption(req), { fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first' })
      .pipe(map(result => this.graphQLUtils.toPagedHttpResponse(result.data.result)));
  }

  create(user: IUser): Observable<EntityResponseType> {
    return this.createUserGQL.mutate({ user: user as CreateUserArgs }).pipe(map(res => this.graphQLUtils.toHttpResponse(res)));
  }

  delete(login: string): Observable<HttpResponse<{}>> {
    return this.deleteUserGQL.mutate({ login }).pipe(map(res => this.graphQLUtils.toHttpResponse(res)));
  }

  find(login: string): Observable<IUser> {
    return this.getUserGQL.fetch({ login }).pipe(map(result => result.data.result));
  }

  partialUpdate(user: IUser): Observable<EntityResponseType> {
    return this.update(user);
  }

  update(user: IUser): Observable<EntityResponseType> {
    return this.updateUserGQL.mutate({ user: user as UpdateUserArgs }).pipe(map(res => this.graphQLUtils.toHttpResponse(res)));
  }

  authorities(): Observable<string[]> {
    return this.getAuthoritiesGQL.fetch().pipe(map(res => res.data.result));
  }

  addUserToCollectionIfMissing(userCollection: IUser[], ...usersToCheck: (IUser | null | undefined)[]): IUser[] {
    const users: IUser[] = usersToCheck.filter(isPresent);
    if (users.length > 0) {
      const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
      const usersToAdd = users.filter(userItem => {
        const userIdentifier = getUserIdentifier(userItem);
        if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
          return false;
        }
        userCollectionIdentifiers.push(userIdentifier);
        return true;
      });
      return [...usersToAdd, ...userCollection];
    }
    return userCollection;
  }
}
