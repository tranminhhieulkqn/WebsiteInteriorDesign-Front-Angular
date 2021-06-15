import { Component, OnInit } from '@angular/core';
import { blogCategories } from 'src/app/data/blog';
@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html'
})
export class PostCategoriesComponent implements OnInit {
  data = blogCategories.slice();
  constructor() { }

  ngOnInit() {
  }

}
