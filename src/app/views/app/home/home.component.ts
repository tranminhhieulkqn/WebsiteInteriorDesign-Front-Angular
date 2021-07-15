import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { TestService } from "../../../shared/test.service";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthService } from 'src/app/shared/auth.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { carouselData, ICarouselItem, IPostItem } from 'src/app/data/carousels';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/shared/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 2000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  userCurrent: any;
  allUser: User[] = [];
  displayName = '';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  slides = [
    { image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80', text: 'First' },
    { image: 'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80', text: 'Second' },
    { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80', text: 'Third' }
  ];
  //  carouselItems: ICarouselItem[] = carouselData;
  featurePost: IPostItem[] = [];
  recentPost: IPostItem[] = [];
  noWrapSlides = false;
  showIndicator = true;
  showfeature = false;
  showrecent = false;
  hashPasswword: string = null;
  des: string;
  postID: string;
  currentPost: Post;


  featuredPosts = [] as Post[];
  recentPosts = [] as Post[];



  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private test: TestService,
    private postService: PostService,
  ) {

  }

  // getRecentPosts() {
  //   // get post info from server
  //   this.postService.getLastPost(7)
  //     .subscribe(
  //       res => {
  //         this.currentPost = res['posts'] as Post;
  //         this.postID = res['posts'].id;
  //         for (let index = 0; index < 5; index++) {
  //           try { this.des = res['posts'][index].summary.toString() } catch (error) { this.des = ' '; }
  //           this.recentPost.push({
  //             id: res['posts'][index].id.toString(),
  //             title: res['posts'][index].title.toString(),
  //             detail: this.des,
  //             img: res['posts'][index].thumbnail.toString(),
  //             badges: ['NEW'],
  //             category: res['posts'][index].category.toString(),
  //           } as IPostItem)

  //         }
  //         for (let i = 0; i < 5; i++) {
  //           console.log(this.recentPost[i])
  //         }
  //       },
  //       err => console.log(err),
  //       () => this.showrecent = true,
  //     )
  // }

  getRecentPosts() {
    this.showrecent = false;
    this.postService.getLastPost(7)
      .subscribe(
        (next) => {
          this.recentPosts = next['posts']
        },
        (error) => console.log(error),
        () => this.showrecent = true // complate
      )
  }

  getFeaturedPosts() {
    this.showfeature = false
    this.postService.getFeaturedPost(7, 1)
    .subscribe(
      (next) => {
        this.featuredPosts = next['posts']
      },
      (error) => console.log(error),
      () => this.showfeature = true // complete
    )
  }





  ngAfterViewInit(): void {
    this.notifications.create(
      `Hello ${this.displayName}`,
      'content',
      NotificationType.Info,
      {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false
      }
    );
  }


  ngOnInit(): void {
    this.getRecentPosts()
    this.getFeaturedPosts()
    if (this.authService.user) {
      this.displayName = this.authService.user.displayName;
    }
    this.userCurrent = this.authService.userCurrent$;
    this.test.getAllUser()
      .subscribe(res => {
        this.allUser = res['users'];
        console.log(this.allUser)
      });
  }

  // onTest(user: User) {
  //   try {
  //     this.notifications.create(
  //       user.displayName,
  //       `Email: ${user.email}`,
  //       NotificationType.Success,
  //       {
  //         theClass: 'primary',
  //         timeOut: 3000,
  //         showProgressBar: true,
  //         pauseOnHover: true,
  //         clickToClose: true
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }
}
