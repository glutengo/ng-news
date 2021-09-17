import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { PostService } from 'app/entities/post/service/post.service';
import { map } from 'rxjs/operators';
import { IPost } from 'app/entities/post/post.model';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { POSTS_PER_CATEGORY } from 'app/config/pagination.constants';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  posts: Observable<IPost[]>;
  categories: Observable<ICategory[]>;

  constructor(private accountService: AccountService,
              private router: Router,
              private postService: PostService,
              private categoryService: CategoryService) {
    this.posts = this.postService.query({size: POSTS_PER_CATEGORY}).pipe(map(res =>  res.body ?? []));
    this.categories = this.categoryService.query({includePosts: POSTS_PER_CATEGORY}).pipe(map((res => res.body ?? [])));
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
