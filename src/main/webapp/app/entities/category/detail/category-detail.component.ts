import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IPost } from 'app/entities/post/post.model';
import { PostService } from 'app/entities/post/service/post.service';

import { ICategory } from '../category.model';

@Component({
  selector: 'jhi-category-detail',
  templateUrl: './category-detail.component.html',
})
export class CategoryDetailComponent implements OnInit {
  category: ICategory | null = null;
  posts: IPost[] = [];
  page = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  ngbPaginationPage = 1;

  constructor(protected activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ category }) => {
      this.category = category;
      this.loadPage(1);
    });
  }

  loadPage(page: number): void {
    if (this.category) {
      this.postService.query({ category: this.category.id, size: this.itemsPerPage, page: page - 1 }).subscribe(res => {
        this.totalItems = Number(res.headers.get('x-total-count'));
        this.posts = res.body ?? [];
        this.page = page;
      })
    }
  }

  previousState(): void {
    window.history.back();
  }
}
