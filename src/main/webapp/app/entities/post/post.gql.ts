import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

import { ArgsType, Field, ObjectType, buildQuery, buildMutation } from 'graphql-typeop';
import {
  CreatePostArgsImpl,
  Mutation,
  MutationCreatePostArgs,
  MutationDeletePostArgs,
  MutationUpdatePostArgs,
  PaginatedPost,
  Post,
  PostEdge,
  Query,
  QueryGetPostArgs,
  UpdatePostArgsImpl,
} from 'app/graphql';
import { BasePost, DetailPost, PaginationVars } from 'app/graphql/graphql.common-types';

@ArgsType()
class GetPostVars implements QueryGetPostArgs {
  id!: number;
}

@ObjectType()
class GetPostQuery {
  @Field<Query, GetPostVars>({ aliasFor: 'getPost' })
  result!: DetailPost;
}

@ArgsType()
class GetPostsVars extends PaginationVars {}

@ObjectType()
class PostEdgeResult implements Partial<PostEdge> {
  node!: DetailPost;
}

@ObjectType()
class GetPostsResult implements Partial<PaginatedPost> {
  edges!: PostEdgeResult[];
  totalCount?: number;
}

@ObjectType()
class GetPostsQuery {
  @Field<Query, GetPostsVars>({ aliasFor: 'getPosts' })
  result!: GetPostsResult;
}

@ArgsType()
export class CreatePostVars implements MutationCreatePostArgs {
  post!: CreatePostArgsImpl;
}

@ObjectType()
class CreatePostMutation {
  @Field<Mutation, CreatePostVars>({ aliasFor: 'createPost' })
  result!: DetailPost;
}

@ArgsType()
export class UpdatePostVars implements MutationUpdatePostArgs {
  post!: UpdatePostArgsImpl;
}

@ObjectType()
class UpdatePostMutation {
  @Field<Mutation, UpdatePostVars>({ aliasFor: 'updatePost' })
  result!: DetailPost;
}

@ArgsType()
class DeletePostVars implements MutationDeletePostArgs {
  id!: number;
}

@ObjectType()
class DeletePostMutation {
  @Field<Mutation, GetPostVars>({ aliasFor: 'deletePost' })
  result!: number;
}

export const GetPostDocument = buildQuery(GetPostQuery, GetPostVars);
export const GetPostsDocument = buildQuery(GetPostsQuery, GetPostsVars);
export const CreatePostDocument = buildMutation(CreatePostMutation, CreatePostVars);
export const UpdatePostDocument = buildMutation(UpdatePostMutation, UpdatePostVars);
export const DeletePostDocument = buildMutation(DeletePostMutation, DeletePostVars);

@Injectable({ providedIn: 'root' })
export class GetPostGQL extends Apollo.Query<GetPostQuery, GetPostVars> {
  document = GetPostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class GetPostsGQL extends Apollo.Query<GetPostsQuery, GetPostsVars> {
  document = GetPostsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class CreatePostGQL extends Apollo.Mutation<CreatePostMutation, CreatePostVars> {
  document = CreatePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class UpdatePostGQL extends Apollo.Mutation<UpdatePostMutation, UpdatePostVars> {
  document = UpdatePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class DeletePostGQL extends Apollo.Mutation<DeletePostMutation, DeletePostVars> {
  document = DeletePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

const usedClasses = [CreatePostArgsImpl, UpdatePostArgsImpl];
