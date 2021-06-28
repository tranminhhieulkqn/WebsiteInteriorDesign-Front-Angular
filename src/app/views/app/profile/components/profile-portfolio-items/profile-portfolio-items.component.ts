import { Component, Input, OnInit } from '@angular/core';
import products from 'src/app/data/products';
import { IProduct } from 'src/app/data/api.service';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-profile-portfolio-items',
  templateUrl: './profile-portfolio-items.component.html'
})
export class ProfilePortfolioItemsComponent implements OnInit {
  @Input() authorID: string;

  data: IProduct[] = products.slice(0, 18);
  dataPosts = [] as Post[];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
    console.log(this.authorID);
    this.postService.getPostsByAuthor(this.authorID)
      .subscribe(
        (res) => {
          console.log(res);
          this.dataPosts = res['posts'];
        },
        (err) => { },
        () => { } // complete
      )
  }

}
