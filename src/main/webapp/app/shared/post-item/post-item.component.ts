import { Component, Input } from '@angular/core';
import { IPost } from 'app/entities/post/post.model';

@Component({
  selector: 'jhi-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input() post!: IPost;

  getExcerpt(): string {
    return `${(this.post.content ?? '').substr(0, 40)}...`
  }

}
