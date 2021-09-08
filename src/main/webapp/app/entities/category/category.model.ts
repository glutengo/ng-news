import { IPost } from 'app/entities/post/post.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  posts?: IPost[] | null;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string | null, public posts?: IPost[] | null) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
