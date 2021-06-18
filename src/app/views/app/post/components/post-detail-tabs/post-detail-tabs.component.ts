import { Component, OnInit } from '@angular/core';
import commentData, { IComment } from 'src/app/data/comments';
import questionData, { IQuestion } from 'src/app/data/questions';

@Component({
  selector: 'app-post-detail-tabs',
  templateUrl: './post-detail-tabs.component.html'
})
export class PostDetailTabsComponent implements OnInit {
  comments: IComment[] = commentData;
  questions: IQuestion[] = questionData;

  constructor() { }

  ngOnInit(): void {
  }

}
