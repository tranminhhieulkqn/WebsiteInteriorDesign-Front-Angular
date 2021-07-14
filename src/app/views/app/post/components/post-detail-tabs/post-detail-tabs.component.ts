import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { from } from 'rxjs';
import commentData, { IComment } from 'src/app/data/comments';
import questionData, { IQuestion } from 'src/app/data/questions';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { CommentService } from 'src/app/shared/comment.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-post-detail-tabs',
  templateUrl: './post-detail-tabs.component.html'
})
export class PostDetailTabsComponent implements OnInit {
  @Input() currentPost: Post;
  @Input() postAuthor: User;
  @Input() postComments: Comment[];
  @Input() questions: IQuestion[];

  currentUserID = this.authService.user.uid;

  newComment = {
    authorID: this.authService.user.uid,
    displayNameAuthor: this.authService.user.displayName,
    authorAvatar: this.authService.user.photoURL,
    content: '',
    rated: 0,
  } as Comment;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    if (!this.questions) this.questions = questionData;
  }

  checkValidation(form: NgForm) {
    let value = form.value;
    return (String(value.content)).length > 0 && Number(value.rated) > 0;
  }

  clickSubmitCommentButton(form: NgForm) {
    this.newComment.postID = this.currentPost.id;
    this.newComment.dateCreated = new Date();
    console.log(this.newComment);

    this.commentService.addComment(this.newComment)
      .subscribe(
        (next) => {
          this.postComments.push(next['comment']);
        },
        (error) => console.log(error), // show message
        () => { // complete
          // reset data
          this.newComment.content = "";
          this.newComment.rated = 0;
        }
      )
  }

  clickDeleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.id)
      .subscribe(
        (next) => this.postComments.splice(this.postComments.indexOf(comment), 1),
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

  clickLikeComment(comment: Comment) {
    this.commentService.addLike(comment.id, this.authService.user.uid).subscribe(
      (next) => this.postComments[this.postComments.indexOf(comment)].liked.push(this.authService.user.uid),
      (error) => console.log(error), // show message
      () => { } // complete
    );
  }

  clickUnlikeComment(comment: Comment) {
    this.commentService.deleteLike(comment.id, this.authService.user.uid).subscribe(
      (next) => {
        let indexComment = this.postComments.indexOf(comment);
        let indexLikedUser = this.postComments[indexComment].liked.indexOf(this.authService.user.uid);
        this.postComments[indexComment].liked.splice(indexLikedUser, 1);
      },
      (error) => console.log(error), // show message
      () => { } // complete
    );
  }

}
