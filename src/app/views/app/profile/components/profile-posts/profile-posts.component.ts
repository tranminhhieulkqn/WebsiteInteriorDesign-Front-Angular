import { Component, OnInit } from '@angular/core';
import posts from 'src/app/data/posts';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html'
})
export class ProfilePostsComponent implements OnInit {
  data = posts.slice();

  constructor() { }

  ngOnInit() {
  }

}
