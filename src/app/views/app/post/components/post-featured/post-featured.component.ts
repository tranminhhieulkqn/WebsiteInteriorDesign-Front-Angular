import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-featured',
  templateUrl: './post-featured.component.html',
})
export class PostFeaturedComponent implements OnInit {

  @Input() noRecentPost: number; // number of recent posts will get
  maxRecentPosts: number = 3; // max number of recent posts will get
  monthago: number = 1;

  featuredPosts = [] as Post[];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.maxRecentPosts = this.noRecentPost | this.maxRecentPosts;
    this.getRecentPosts();
  }

  getRecentPosts() {
    this.postService.getFeaturedPost(this.maxRecentPosts, this.monthago)
      .subscribe(
        (next) => {
          this.featuredPosts = next['posts']
          console.log(this.featuredPosts);
        },
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

}
