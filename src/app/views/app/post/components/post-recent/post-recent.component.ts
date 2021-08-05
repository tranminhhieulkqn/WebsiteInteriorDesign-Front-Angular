import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-recent',
  templateUrl: './post-recent.component.html'
})
export class PostRecentComponent implements OnInit {
  @Input() noRecentPost: number; // number of recent posts will get
  maxRecentPosts: number = 3; // max number of recent posts will get

  recentPosts: Post[];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.maxRecentPosts = this.noRecentPost | this.maxRecentPosts;
    this.getRecentPosts();

  }

  getRecentPosts() {
    this.postService.getLastPost(this.maxRecentPosts)
      .subscribe(
        (next) => {
          this.recentPosts = next['posts']
          // console.log(this.recentPosts);
        },
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

}
