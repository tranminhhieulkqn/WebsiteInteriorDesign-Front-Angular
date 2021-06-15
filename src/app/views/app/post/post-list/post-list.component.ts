import { Component, OnInit } from '@angular/core';
import { blogData } from 'src/app/data/blog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  data = blogData.slice();

  constructor() { }

  ngOnInit(): void {
  }

}
