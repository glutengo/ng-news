import { Component, Input } from '@angular/core';
import { ICategory } from 'app/entities/category/category.model';

@Component({
  selector: 'jhi-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent {

  @Input() category!: ICategory;


}
