import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-recommended',
  templateUrl: './post-recommended.component.html',
})
export class PostRecommendedComponent implements OnInit {

  @Input() noRecentPost: number; // number of recent posts will get
  maxRecommendedPosts: number = 1; // max number of recent posts will get

  userCurrent: firebase.User
  recommendedPosts: Post[];

  constructor(
    private authService: AuthService,
    private postService: PostService,
  ) {
    this.userCurrent = this.authService.user
  }

  ngOnInit(): void {
    this.maxRecommendedPosts = this.noRecentPost | this.maxRecommendedPosts;
    this.getRecommendedPosts();
  }

  getRecommendedPosts() {
    this.postService.getRecommendedPost(this.maxRecommendedPosts, this.userCurrent.uid.toString())
      .subscribe(
        (next) => {
          this.recommendedPosts = next['posts']
          // console.log(this.recommendedPosts);
        },
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

}
