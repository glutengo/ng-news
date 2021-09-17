import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

import { ArgsType, Field, ObjectType, buildQuery, buildMutation } from 'graphql-typeop';
import {
  CreateCategoryArgsImpl,
  Mutation,
  MutationCreateCategoryArgs,
  MutationDeleteCategoryArgs,
  MutationUpdateCategoryArgs,
  PaginatedCategory,
  CategoryEdge,
  Query,
  QueryGetCategoryArgs,
  UpdateCategoryArgsImpl,
  Post,
  CategoryPostsArgs,
  Category,
} from 'app/graphql';
import { BaseCategory, BasePost, DetailCategory, ListPost, PaginationVars } from 'app/graphql/graphql.common-types';

@ArgsType()
class GetCategoryVars implements QueryGetCategoryArgs {
  id!: number;
}

@ObjectType()
class GetCategoryQuery {
  @Field<Query, GetCategoryVars>({ aliasFor: 'getCategory' })
  result!: BaseCategory;
}

@ArgsType()
class GetCategoriesVars extends PaginationVars {}

@ArgsType()
class GetCategoriesQueryVars extends PaginationVars {
  includePosts!: boolean;
  takePosts?: number;
}

@ObjectType()
class CategoryWithPosts extends BaseCategory implements Partial<Category>{
  @Field<Post, CategoryPostsArgs, GetCategoriesQueryVars>({include: '$includePosts', args: { take: '$takePosts' }})
  posts!: ListPost[]
}

@ObjectType()
class CategoryEdgeResult implements Partial<CategoryEdge> {
  node!: CategoryWithPosts;
}

@ObjectType()
class GetCategoriesResult implements Partial<PaginatedCategory> {
  edges!: CategoryEdgeResult[];
  totalCount?: number;
}

@ObjectType()
class GetCategoriesQuery {
  @Field<Query, GetCategoriesVars>({ aliasFor: 'getCategories' })
  result!: GetCategoriesResult;
}

@ArgsType()
export class CreateCategoryVars implements MutationCreateCategoryArgs {
  category!: CreateCategoryArgsImpl;
}

@ObjectType()
class CreateCategoryMutation {
  @Field<Mutation, CreateCategoryVars>({ aliasFor: 'createCategory' })
  result!: DetailCategory;
}

@ArgsType()
export class UpdateCategoryVars implements MutationUpdateCategoryArgs {
  category!: UpdateCategoryArgsImpl;
}

@ObjectType()
class UpdateCategoryMutation {
  @Field<Mutation, UpdateCategoryVars>({ aliasFor: 'updateCategory' })
  result!: DetailCategory;
}

@ArgsType()
class DeleteCategoryVars implements MutationDeleteCategoryArgs {
  id!: number;
}

@ObjectType()
class DeleteCategoryMutation {
  @Field<Mutation, GetCategoryVars>({ aliasFor: 'deleteCategory' })
  result!: number;
}

export const GetCategoryDocument = buildQuery(GetCategoryQuery, GetCategoryVars);
export const GetCategoriesDocument = buildQuery(GetCategoriesQuery, GetCategoriesQueryVars);
export const CreateCategoryDocument = buildMutation(CreateCategoryMutation, CreateCategoryVars);
export const UpdateCategoryDocument = buildMutation(UpdateCategoryMutation, UpdateCategoryVars);
export const DeleteCategoryDocument = buildMutation(DeleteCategoryMutation, DeleteCategoryVars);

@Injectable({ providedIn: 'root' })
export class GetCategoryGQL extends Apollo.Query<GetCategoryQuery, GetCategoryVars> {
  document = GetCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class GetCategoriesGQL extends Apollo.Query<GetCategoriesQuery, GetCategoriesQueryVars> {
  document = GetCategoriesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class CreateCategoryGQL extends Apollo.Mutation<CreateCategoryMutation, CreateCategoryVars> {
  document = CreateCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class UpdateCategoryGQL extends Apollo.Mutation<UpdateCategoryMutation, UpdateCategoryVars> {
  document = UpdateCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

@Injectable({ providedIn: 'root' })
export class DeleteCategoryGQL extends Apollo.Mutation<DeleteCategoryMutation, DeleteCategoryVars> {
  document = DeleteCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

const usedClasses = [CreateCategoryArgsImpl, UpdateCategoryArgsImpl, ListPost];
