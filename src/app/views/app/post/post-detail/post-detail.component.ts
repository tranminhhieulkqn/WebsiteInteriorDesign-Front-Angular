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

  detailImages: ICarouselImage[] = [];// carouselImages;
  detailThumbs: ICarouselImage[] = [];// carouselThumbs;

  showGallery = false;

  constructor(
    private postService: PostService,
  ) {
    this.postService.getPost("jNIN4ouOLv4yGjRUXdVy")
      .subscribe(
        res => {
          // console.log(res)
          for (let index = 0; index < res['post'].gallery.length; index++) {
            const element = res['post'].gallery[index];
            this.detailImages.push({
              id: `lager-${index.toString()}`,
              img: element.toString()
            } as ICarouselImage)
          }
          this.detailThumbs = this.detailImages
        },
        err => {

        },
        () => {
          console.log("complete");
          this.showGallery = true;
        }
      )
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

}
