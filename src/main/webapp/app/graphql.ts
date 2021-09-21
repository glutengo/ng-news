import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type Category = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
};

export type CategoryEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: Category;
};

export type CategoryReference = {
  id: Scalars['Int'];
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateCategoryArgs = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type CreatePostArgs = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  content: Scalars['String'];
  coverImageUrl: Scalars['String'];
  author: UserReference;
  category: CategoryReference;
};

export type CreateUserArgs = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  login: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  activated?: Maybe<Scalars['Boolean']>;
  langKey?: Maybe<Scalars['String']>;
  authorities: Array<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  activationKey?: Maybe<Scalars['String']>;
  resetKey?: Maybe<Scalars['String']>;
  resetDate?: Maybe<Scalars['DateTime']>;
  password?: Maybe<Scalars['String']>;
};


export type Mutation = {
  createUser: User;
  updateUser: User;
  deleteUser: User;
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['Int'];
  createCategory: Category;
  updateCategory: Category;
  deleteCategory: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  user: CreateUserArgs;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserArgs;
};


export type MutationDeleteUserArgs = {
  login: Scalars['String'];
};


export type MutationCreatePostArgs = {
  post: CreatePostArgs;
};


export type MutationUpdatePostArgs = {
  post: UpdatePostArgs;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCategoryArgs = {
  category: CreateCategoryArgs;
};


export type MutationUpdateCategoryArgs = {
  category: UpdateCategoryArgs;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};

export type PaginatedCategory = {
  edges: Array<CategoryEdge>;
  totalCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type PaginatedPost = {
  edges: Array<PostEdge>;
  totalCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type PaginatedUser = {
  edges: Array<UserEdge>;
  totalCount?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type Post = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  author?: Maybe<User>;
  category?: Maybe<Category>;
};


export type PostContentArgs = {
  length?: Maybe<Scalars['Int']>;
};

export type PostEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: Post;
};

export type Query = {
  getUsers: PaginatedUser;
  getUser: User;
  getAuthorities: Array<Scalars['String']>;
  getPosts: PaginatedPost;
  getPost: Post;
  getCategories: PaginatedCategory;
  getCategory: Category;
};


export type QueryGetUsersArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryGetUserArgs = {
  login: Scalars['String'];
};


export type QueryGetPostsArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryGetPostArgs = {
  id: Scalars['Int'];
};


export type QueryGetCategoriesArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  usersUpdated: Scalars['Int'];
  postsUpdated: Scalars['Int'];
  categoriesUpdated: Scalars['Int'];
};

export type UpdateCategoryArgs = {
  id: Scalars['Int'];
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
};

export type UpdatePostArgs = {
  id: Scalars['Int'];
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  content: Scalars['String'];
  coverImageUrl: Scalars['String'];
  author?: Maybe<UserReference>;
  category?: Maybe<CategoryReference>;
};

export type UpdateUserArgs = {
  id: Scalars['Int'];
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  login: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  activated?: Maybe<Scalars['Boolean']>;
  langKey?: Maybe<Scalars['String']>;
  authorities: Array<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  activationKey?: Maybe<Scalars['String']>;
  resetKey?: Maybe<Scalars['String']>;
  resetDate?: Maybe<Scalars['DateTime']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  id?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  login?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  langKey?: Maybe<Scalars['String']>;
  authorities?: Maybe<Array<Scalars['String']>>;
  imageUrl?: Maybe<Scalars['String']>;
  activationKey?: Maybe<Scalars['String']>;
  resetKey?: Maybe<Scalars['String']>;
  resetDate?: Maybe<Scalars['DateTime']>;
};

export type UserEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: User;
};

export type UserReference = {
  id: Scalars['Int'];
  createdBy?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<Scalars['String']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']>;
  login?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  langKey?: Maybe<Scalars['String']>;
  authorities?: Maybe<Array<Scalars['String']>>;
  imageUrl?: Maybe<Scalars['String']>;
  activationKey?: Maybe<Scalars['String']>;
  resetKey?: Maybe<Scalars['String']>;
  resetDate?: Maybe<Scalars['DateTime']>;
};

export type GetCategoriesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
}>;


export type GetCategoriesQuery = { result: (
    Pick<PaginatedCategory, 'totalCount'>
    & { edges: Array<{ node: DetailCategoryFragment }> }
  ) };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCategoryQuery = { result: DetailCategoryFragment };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = { result: Mutation['deleteCategory'] };

export type CreateCategoryMutationVariables = Exact<{
  category: CreateCategoryArgs;
}>;


export type CreateCategoryMutation = { result: DetailCategoryFragment };

export type UpdateCategoryMutationVariables = Exact<{
  category: UpdateCategoryArgs;
}>;


export type UpdateCategoryMutation = { result: DetailCategoryFragment };

export type BaseCategoryFragment = Pick<Category, 'id' | 'name'>;

export type DetailCategoryFragment = BaseCategoryFragment;

export type GetPostsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
}>;


export type GetPostsQuery = { result: (
    Pick<PaginatedPost, 'totalCount'>
    & { edges: Array<{ node: DetailPostFragment }> }
  ) };

export type GetPostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPostQuery = { result: DetailPostFragment };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { result: Mutation['deletePost'] };

export type CreatePostMutationVariables = Exact<{
  post: CreatePostArgs;
}>;


export type CreatePostMutation = { result: DetailPostFragment };

export type UpdatePostMutationVariables = Exact<{
  post: UpdatePostArgs;
}>;


export type UpdatePostMutation = { result: DetailPostFragment };

export type BasePostFragment = Pick<Post, 'id' | 'title' | 'content' | 'coverImageUrl'>;

export type DetailPostFragment = (
  { author?: Maybe<Pick<User, 'id' | 'login'>>, category?: Maybe<Pick<Category, 'id' | 'name'>> }
  & BasePostFragment
);

export type GetUsersQueryVariables = Exact<{
  size?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
}>;


export type GetUsersQuery = { result: (
    Pick<PaginatedUser, 'totalCount'>
    & { edges: Array<{ node: DetailUserFragment }> }
  ) };

export type GetUserQueryVariables = Exact<{
  login: Scalars['String'];
}>;


export type GetUserQuery = { result: DetailUserFragment };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserArgs;
}>;


export type CreateUserMutation = { result: DetailUserFragment };

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserArgs;
}>;


export type UpdateUserMutation = { result: DetailUserFragment };

export type DeleteUserMutationVariables = Exact<{
  login: Scalars['String'];
}>;


export type DeleteUserMutation = { result: BaseUserFragment };

export type BaseUserFragment = Pick<User, 'login' | 'id'>;

export type DetailUserFragment = (
  Pick<User, 'email' | 'langKey' | 'firstName' | 'lastName' | 'createdDate' | 'lastModifiedDate' | 'lastModifiedBy' | 'authorities' | 'activated'>
  & BaseUserFragment
);

export type GetAuthoritiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthoritiesQuery = { result: Query['getAuthorities'] };

export const BaseCategoryFragmentDoc = gql`
    fragment BaseCategory on Category {
  id
  name
}
    `;
export const DetailCategoryFragmentDoc = gql`
    fragment DetailCategory on Category {
  ...BaseCategory
}
    ${BaseCategoryFragmentDoc}`;
export const BasePostFragmentDoc = gql`
    fragment BasePost on Post {
  id
  title
  content
  coverImageUrl
}
    `;
export const DetailPostFragmentDoc = gql`
    fragment DetailPost on Post {
  ...BasePost
  author {
    id
    login
  }
  category {
    id
    name
  }
}
    ${BasePostFragmentDoc}`;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  login
  id
}
    `;
export const DetailUserFragmentDoc = gql`
    fragment DetailUser on User {
  ...BaseUser
  email
  langKey
  firstName
  lastName
  createdDate
  lastModifiedDate
  lastModifiedBy
  authorities
  activated
}
    ${BaseUserFragmentDoc}`;
export const GetCategoriesDocument = gql`
    query getCategories($page: Int, $size: Int, $sort: String) {
  result: getCategories(page: $page, size: $size, sort: $sort) {
    edges {
      node {
        ...DetailCategory
      }
    }
    totalCount
  }
}
    ${DetailCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoriesGQL extends Apollo.Query<GetCategoriesQuery, GetCategoriesQueryVariables> {
    document = GetCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCategoryDocument = gql`
    query getCategory($id: Int!) {
  result: getCategory(id: $id) {
    ...DetailCategory
  }
}
    ${DetailCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCategoryGQL extends Apollo.Query<GetCategoryQuery, GetCategoryQueryVariables> {
    document = GetCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: Int!) {
  result: deleteCategory(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCategoryGQL extends Apollo.Mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables> {
    document = DeleteCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCategoryDocument = gql`
    mutation createCategory($category: CreateCategoryArgs!) {
  result: createCategory(category: $category) {
    ...DetailCategory
  }
}
    ${DetailCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCategoryGQL extends Apollo.Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> {
    document = CreateCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCategoryDocument = gql`
    mutation updateCategory($category: UpdateCategoryArgs!) {
  result: updateCategory(category: $category) {
    ...DetailCategory
  }
}
    ${DetailCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCategoryGQL extends Apollo.Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {
    document = UpdateCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPostsDocument = gql`
    query getPosts($page: Int, $size: Int, $sort: String) {
  result: getPosts(page: $page, size: $size, sort: $sort) {
    edges {
      node {
        ...DetailPost
      }
    }
    totalCount
  }
}
    ${DetailPostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPostsGQL extends Apollo.Query<GetPostsQuery, GetPostsQueryVariables> {
    document = GetPostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPostDocument = gql`
    query getPost($id: Int!) {
  result: getPost(id: $id) {
    ...DetailPost
  }
}
    ${DetailPostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPostGQL extends Apollo.Query<GetPostQuery, GetPostQueryVariables> {
    document = GetPostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  result: deletePost(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePostGQL extends Apollo.Mutation<DeletePostMutation, DeletePostMutationVariables> {
    document = DeletePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePostDocument = gql`
    mutation createPost($post: CreatePostArgs!) {
  result: createPost(post: $post) {
    ...DetailPost
  }
}
    ${DetailPostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePostGQL extends Apollo.Mutation<CreatePostMutation, CreatePostMutationVariables> {
    document = CreatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePostDocument = gql`
    mutation updatePost($post: UpdatePostArgs!) {
  result: updatePost(post: $post) {
    ...DetailPost
  }
}
    ${DetailPostFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePostGQL extends Apollo.Mutation<UpdatePostMutation, UpdatePostMutationVariables> {
    document = UpdatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUsersDocument = gql`
    query getUsers($size: Int, $page: Int, $sort: String) {
  result: getUsers(size: $size, page: $page, sort: $sort) {
    edges {
      node {
        ...DetailUser
      }
    }
    totalCount
  }
}
    ${DetailUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUsersGQL extends Apollo.Query<GetUsersQuery, GetUsersQueryVariables> {
    document = GetUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserDocument = gql`
    query getUser($login: String!) {
  result: getUser(login: $login) {
    ...DetailUser
  }
}
    ${DetailUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($user: CreateUserArgs!) {
  result: createUser(user: $user) {
    ...DetailUser
  }
}
    ${DetailUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation updateUser($user: UpdateUserArgs!) {
  result: updateUser(user: $user) {
    ...DetailUser
  }
}
    ${DetailUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation deleteUser($login: String!) {
  result: deleteUser(login: $login) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAuthoritiesDocument = gql`
    query getAuthorities {
  result: getAuthorities
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAuthoritiesGQL extends Apollo.Query<GetAuthoritiesQuery, GetAuthoritiesQueryVariables> {
    document = GetAuthoritiesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }