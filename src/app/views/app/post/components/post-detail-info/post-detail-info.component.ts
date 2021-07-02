import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-detail-info',
  templateUrl: './post-detail-info.component.html'
})
export class PostDetailInfoComponent implements OnInit {
  @Input() currentPost: Post;
  @Input() noComment: number;
  @Input() currentUserID: string;

  constructor(
    private postService: PostService,
  ) {

  }

  ngOnInit(): void {
  }

  clickLikePost() {
    this.postService.addLike(this.currentPost.id, this.currentUserID)
      .subscribe(
        (next) => this.currentPost.liked.push(this.currentUserID),
        (error) => console.log(error), // show message
        () => { }// complete
      )
  }

  clickUnlikePost() {
    this.postService.deleteLike(this.currentPost.id, this.currentUserID)
      .subscribe(
        (next) => this.currentPost.liked.splice(this.currentPost.liked.indexOf(this.currentUserID), 1),
        (error) => console.log(error), // show message
        () => { }// complete
      )
  }

}
