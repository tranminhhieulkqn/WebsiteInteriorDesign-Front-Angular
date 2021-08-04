import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/user.service';
import { CommentService } from 'src/app/shared/comment.service';
import { AuthService } from 'src/app/shared/auth.service';
import { UserRecordsService } from 'src/app/shared/user-records.service';

interface ICarouselImage {
  id: string;
  img: string;
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  //#region /** Variable definition */

  currentUser = {} as User;
  currentPostID: string;
  currentPost: Post;
  postAuthor: User;
  postComments: Comment[];
  // for show gallery
  showGallery = false;
  detailImages: ICarouselImage[] = [];

  currentUserID: string;

  //#endregion

  showRecommentedPost = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private userRecordsService: UserRecordsService
  ) {
    this.getParamFromURL(); // get id post from url
    this.currentUserID = authService.user.uid;
    this.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.currentPostID) { // if in url has id param and get success
      this.getPost();
      this.addNewViewed();
    }
    else { // if not, get lastest post.
      this.getLastestPost();
    }
  }

  ngOnDestroy() {

  }

  getParamFromURL() {
    this.route.queryParams.subscribe(
      params => {
        this.currentPostID = params['id'];
      });
  }

  //#region /** Get data (post) for page */

  addNewViewed() {
    this.userRecordsService.addViewed(this.currentUserID.toString(), this.currentPostID)
      .subscribe(
        (next) => { },
        (error) => { },
        () => {
          this.showRecommentedPost = true;
        }
      )
  }

  getGallery() {
    this.currentPost.gallery.forEach(element => {
      // push object image for list
      this.detailImages.push({
        id: this.currentPost.gallery.indexOf(element).toString(),
        img: element.toString()
      } as ICarouselImage)
    });
    this.showGallery = true; // show element gallery on html
  }

  getCurrentUser() {
    this.userService.getUser(this.currentUserID)
      .subscribe(
        (next) => {
          this.currentUser = next['user']
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

  getAuthor() {
    this.userService.getUser(this.currentPost.authorID)
      .subscribe(
        (next) => this.postAuthor = next['user'],
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

  getComments() {
    this.commentService.getCommentsForPost(this.currentPost.id)
      .subscribe(
        (next) => this.postComments = next['comments'].sort((a, b) => (a.dateCreated < b.dateCreated ? -1 : 1)),
        (error) => console.log(error), // show message
        () => { } // complete
      )
  }

  getPost() {
    this.postService.getPost(this.currentPostID)
      .subscribe(
        (next) => this.currentPost = next['post'], // get current post to show
        (error) => console.log(error), // show message if error
        () => {
          this.getAuthor(); // get user author
          this.getGallery(); // get image for gallery
          this.getComments(); // get all comments of post
        }
      )
  }

  getLastestPost() {
    this.postService.getLastPost()
      .subscribe(
        (next) => this.currentPost = next['posts'][0], // get current post to show
        (error) => console.log(error), // show message if error
        () => {
          this.currentPostID = this.currentPost.id; // get current post id
          this.addNewViewed();
          this.getAuthor(); // get user author
          this.getGallery(); // get image for gallery
          this.getComments(); // get all comments of post
        }
      )
  }

  //#endregion


  makeAppointment(id: string) {
    this.router.navigate(['/app/appointment/make-appointment'], { queryParams: { id: id } });
  }

}
