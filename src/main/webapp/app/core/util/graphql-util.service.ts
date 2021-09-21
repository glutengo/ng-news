import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Pagination } from 'app/core/request/request.model';
import { FetchResult } from '@apollo/client/core';

type GraphqlEdge<T> = {
  node: T;
};

type GraphqlResponse<T> = {
  edges?: GraphqlEdge<T>[] | null;
  totalCount?: number;
};

@Injectable({ providedIn: 'root' })
export class GraphQLUtils {
  toHttpResponse<T extends FetchResult<{ result: D }>, D>(response: T): HttpResponse<D> {
    if (response.data) {
      return new HttpResponse<D>({ body: response.data.result });
    } else {
      return new HttpResponse<D>({ body: null });
    }
  }

  toPagedHttpResponse<T>(response: GraphqlResponse<T>): HttpResponse<T[]> {
    // eslint-disable-next-line
    const body = response.edges?.map(edge => edge.node) ?? [];
    // eslint-disable-next-line
    return new HttpResponse<T[]>({ body, headers: new HttpHeaders().set('X-Total-Count', String(response.totalCount)) });
  }

  createGraphQlOption(req?: Pagination): any {
    return {
      ...req,
      sort: req?.sort && req.sort.join(','),
    };
  }
}
