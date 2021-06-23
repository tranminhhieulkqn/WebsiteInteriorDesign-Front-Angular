import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { blog } from 'src/app/data/blog';
@Component({
  selector: 'app-post-list1',
  templateUrl: './post-list1.component.html',
})
export class PostList1Component implements OnInit {

  des : string;
  postID: string;
  currentPost: Post;
  data : blog[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  getAllPost(){
    // get post info from server
    this.postService.getPosts()
      .subscribe(
        res => {
          this.currentPost = res['posts'] as Post;
          this.postID = res['posts'].id;
          for (let index = 0; index < res['posts'].length; index++) {
            try {this.des = res['posts'][index].summary.toString()} catch (error) {this.des = ' ';}
            this.data.push({
              id: res['posts'][index].id.toString(),
              title: res['posts'][index].title.toString(),
              description: this.des,
              thumb: res['posts'][index].thumbnail.toString(),
              badge: 'NEW',
              type: 'image'
            } as blog)
            
          }
        },
        err => console.log(err)// show message
      )
  }


  ngOnInit(): void {
    this.getAllPost()
  }

}
