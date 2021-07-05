import { Component, OnInit } from '@angular/core';
import { blogData } from 'src/app/data/blog';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  // data = blogData.slice();

  listPost: Post[]

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getListPost();
  }

  getListPost() {
    this.postService.getPosts()
      .subscribe(
        (next) => this.listPost = next['posts'],
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

}
