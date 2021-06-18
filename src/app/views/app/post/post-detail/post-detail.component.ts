import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { carouselImages, carouselThumbs, ICarouselImage } from 'src/app/data/carousels';
import { PostService } from 'src/app/shared/post.service';
import { Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() user = {} as User;

  //#region /** Variable definition */

  postID: string;
  currentPost: Post;
  showGallery = false;
  detailImages: ICarouselImage[] = [];

  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
  ) {
    this.route.queryParams.subscribe(
      params => {
        this.postID = params['id'];
      });
  }

  //#region /** Get data (post) for page */

  /**
   * Get post by id from server
   * @param postID post id needed get info
   */
  getPost(postID: string | number) {
    // get post info from server
    this.postService.getPost(postID.toString())
      .subscribe(
        res => {
          try {
            this.currentPost = res['post'] as Post;
            for (let index = 0; index < res['post'].gallery.length; index++) {
              // get image url
              const element = res['post'].gallery[index];
              // push to array image gallery
              this.detailImages.push({
                id: index.toString(),
                img: element.toString()
              } as ICarouselImage)
            }
          } catch (error) {
            this.router.navigateByUrl('/app/post/post-detail').then(() => {
              window.location.reload();
            });
          }
        },
        err => console.log(err), // show message
        () => this.showGallery = true, // show element gallery on html
      )
  }

  /**
   * Get lastest post from server
   */
  getLastPost() {
    // get post info from server
    this.postService.getLastPost()
      .subscribe(
        res => {
          try {
            this.currentPost = res['posts'][0] as Post;
            this.postID = res['posts'][0].id;
            for (let index = 0; index < res['posts'][0].gallery.length; index++) {
              // get image url
              const element = res['posts'][0].gallery[index];
              // push to array image gallery
              this.detailImages.push({
                id: index.toString(),
                img: element.toString()
              } as ICarouselImage)
            }
          } catch (error) {
            this.router.navigateByUrl('/error').then(() => {
              window.location.reload();
            });
          }
        },
        err => console.log(err), // show message
        () => this.showGallery = true, // show element gallery on html
      )
  }

  //#endregion

  ngOnInit(): void {
    if (this.postID) { // if in url has id param and get success
      this.getPost(this.postID);
    }
    else { // if not, get lastest post.
      this.getLastPost();
    }
  }


}
