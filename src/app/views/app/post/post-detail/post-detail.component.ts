import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { carouselImages, carouselThumbs, ICarouselImage } from 'src/app/data/carousels';
import { PostService } from 'src/app/shared/post.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() user = {} as User;

  //#region /** Variable definition */

  postID: string;
  showGallery = false;
  detailImages: ICarouselImage[] = [];

  //#endregion

  constructor(
    private postService: PostService,
  ) { }



  getPost(idPost: string | number) {
    // get post info from server
    this.postService.getPost(idPost.toString())
      .subscribe(
        res => {
          for (let index = 0; index < res['post'].gallery.length; index++) {
            // get image url
            const element = res['post'].gallery[index];
            // push to array image gallery
            this.detailImages.push({
              id: index.toString(),
              img: element.toString()
            } as ICarouselImage)
          }
        },
        err => {
          // show message
          console.log(err);
        },
        () => {
          // show element gallery on html
          this.showGallery = true;
        }
      )
  }

  ngOnInit(): void {

  }

}
