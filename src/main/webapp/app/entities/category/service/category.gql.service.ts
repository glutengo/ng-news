import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory, getCategoryIdentifier } from 'app/entities/category/category.model';
import { GraphQLUtils } from 'app/core/util/graphql-util.service';
import {
  CreateCategoryGQL,
  GetCategoriesGQL,
  GetCategoryGQL,
  DeleteCategoryGQL,
  UpdateCategoryGQL,
  CreateCategoryVars,
  UpdateCategoryVars,
} from '../category.gql';
import { isPresent } from 'app/core/util/operators';

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({ providedIn: 'root' })
export class CategoryGraphQLService {
  constructor(
    private graphQLUtils: GraphQLUtils,
    private createCategoryGQL: CreateCategoryGQL,
    private updateCategoryGQL: UpdateCategoryGQL,
    private getCategoriesGQL: GetCategoriesGQL,
    private getCategoryGQL: GetCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL
  ) {}

  query(req: any = { includePosts: false }): Observable<EntityArrayResponseType> {
    if (req.includePosts) {
      req.takePosts = req.includePosts;
      req.includePosts = true;
    }
    return this.getCategoriesGQL
      .fetch(this.graphQLUtils.createGraphQlOption(req), { fetchPolicy: req?.bypassCache ? 'no-cache' : 'cache-first' })
      .pipe(map(result => this.graphQLUtils.toPagedHttpResponse(result.data.result)));
  }

  create(category: ICategory): Observable<EntityResponseType> {
    return this.createCategoryGQL.mutate({ category } as CreateCategoryVars).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  delete(_id: string): Observable<HttpResponse<{}>> {
    const id = this.getId(_id);
    return this.deleteCategoryGQL.mutate({ id }).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  find(_id: string): Observable<EntityResponseType> {
    const id = this.getId(_id);
    return this.getCategoryGQL.fetch({ id }).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  partialUpdate(category: ICategory): Observable<EntityResponseType> {
    return this.update(category);
  }

  update(category: ICategory): Observable<EntityResponseType> {
    return this.updateCategoryGQL.mutate({ category } as UpdateCategoryVars).pipe(map(result => this.graphQLUtils.toHttpResponse(result)));
  }

  addCategoryToCollectionIfMissing(categoryCollection: ICategory[], ...categoriesToCheck: (ICategory | null | undefined)[]): ICategory[] {
    const categories: ICategory[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categoryCollectionIdentifiers = categoryCollection.map(categoryItem => getCategoryIdentifier(categoryItem)!);
      const categoriesToAdd = categories.filter(categoryItem => {
        const categoryIdentifier = getCategoryIdentifier(categoryItem);
        if (categoryIdentifier == null || categoryCollectionIdentifiers.includes(categoryIdentifier)) {
          return false;
        }
        categoryCollectionIdentifiers.push(categoryIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categoryCollection];
    }
    return categoryCollection;
  }

  private getId(id: string): number {
    return parseInt(id, 10);
  }
}
