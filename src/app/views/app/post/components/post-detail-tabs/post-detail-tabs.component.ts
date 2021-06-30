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
  @Input() comments: IComment[];
  @Input() questions: IQuestion[];

  datetimeNow = new Date('2021-06-18T10:49:53.173Z');

  rate_ = 0;
  rateReadonly = 5;
  content_ = '';

  comments_: Comment[];
  author: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    if (!this.comments) this.comments = commentData;
    if (!this.questions) this.questions = questionData;
    setTimeout(() => {

      if (this.currentPost.id) {
        this.commentService.getCommentsForPost(this.currentPost.id)
          .subscribe(
            (res) => {
              this.comments_ = res['comments']
              this.comments_ =  this.comments_.sort((a, b) => (a.dateCreated < b.dateCreated ? -1 : 1));
            },
            (err) => { },
            () => { }
          )
        this.userService.getUser(this.currentPost.authorID)
        .subscribe(
          (res) => {
            // console.log(res);

            this.author = res['user']
          },
          (err) => { },
          () => { }
        )
      }
    }, 1000);

  }

  clickSubmitCommentButton(form: NgForm) {
    let newComment = {
      postID: this.currentPost.id,
      authorID: this.authService.user.uid,
      displayNameAuthor: this.authService.user.displayName,
      authorAvatar: this.authService.user.photoURL,
      content: form.value.content,
      rated: form.value.rated,
      dateCreated: new Date(),
    } as Comment;
    console.log(newComment);
    this.commentService.addComment(newComment)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => { },
        () => {
          this.comments_.push(newComment);
        }
      )
  }

  checkValidation(form: NgForm) {
    let value = form.value;
    return (String(value.content)).length > 0 && Number(value.rated) > 0;
  }

  onDrag(event: any) {
    console.log(event);

  }

}
