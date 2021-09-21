import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost, getPostIdentifier } from 'app/entities/post/post.model';
import { GraphQLUtils } from 'app/core/util/graphql-util.service';
import {
  CreatePostGQL,
  GetPostsGQL,
  GetPostGQL,
  DeletePostGQL,
  UpdatePostGQL,
  MutationCreatePostArgs,
  MutationUpdatePostArgs,
} from '../../../graphql';
import { isPresent } from 'app/core/util/operators';

export type EntityResponseType = HttpResponse<IPost>;
export type EntityArrayResponseType = HttpResponse<IPost[]>;

@Injectable({ providedIn: 'root' })
export class PostGraphQLService {
  constructor(
    private graphQLUtils: GraphQLUtils,
    private createPostGQL: CreatePostGQL,
    private updatePostGQL: UpdatePostGQL,
    private getPostsGQL: GetPostsGQL,
    private getPostGQL: GetPostGQL,
    private deletePostGQL: DeletePostGQL
  ) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.getPostsGQL
      .fetch(this.graphQLUtils.createGraphQlOption(req), { fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first' })
      .pipe(map(result => this.graphQLUtils.toPagedHttpResponse(result.data.result)));
  }

  create(post: IPost): Observable<EntityResponseType> {
    return this.createPostGQL.mutate({ post } as MutationCreatePostArgs).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  delete(_id: string): Observable<HttpResponse<{}>> {
    const id = this.getId(_id);
    return this.deletePostGQL.mutate({ id }).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  find(_id: string): Observable<EntityResponseType> {
    const id = this.getId(_id);
    return this.getPostGQL.fetch({ id }).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  partialUpdate(post: IPost): Observable<EntityResponseType> {
    return this.update(post);
  }

  update(post: IPost): Observable<EntityResponseType> {
    return this.updatePostGQL.mutate({ post } as MutationUpdatePostArgs).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  addPostToCollectionIfMissing(postCollection: IPost[], ...postsToCheck: (IPost | null | undefined)[]): IPost[] {
    const posts: IPost[] = postsToCheck.filter(isPresent);
    if (posts.length > 0) {
      const postCollectionIdentifiers = postCollection.map(postItem => getPostIdentifier(postItem)!);
      const postsToAdd = posts.filter(postItem => {
        const postIdentifier = getPostIdentifier(postItem);
        if (postIdentifier == null || postCollectionIdentifiers.includes(postIdentifier)) {
          return false;
        }
        postCollectionIdentifiers.push(postIdentifier);
        return true;
      });
      return [...postsToAdd, ...postCollection];
    }
    return postCollection;
  }

  private getId(id: string): number {
    return parseInt(id, 10);
  }
}
