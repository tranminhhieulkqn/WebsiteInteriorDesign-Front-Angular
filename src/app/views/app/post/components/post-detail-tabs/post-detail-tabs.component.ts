import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import commentData, { IComment } from 'src/app/data/comments';
import questionData, { IQuestion } from 'src/app/data/questions';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail-tabs',
  templateUrl: './post-detail-tabs.component.html'
})
export class PostDetailTabsComponent implements OnInit {
  @Input() currentPost: Post;
  @Input() comments: IComment[];
  @Input() questions: IQuestion[];

  datetimeNow = new Date('2021-06-18T10:49:53.173Z');

  rate = 0;
  rateReadonly = 5;

  constructor() { }

  ngOnInit(): void {
    if (!this.comments) this.comments = commentData;
    if (!this.questions) this.questions = questionData;
  }

  clickSubmitCommentButton(form: NgForm){

  }

}
