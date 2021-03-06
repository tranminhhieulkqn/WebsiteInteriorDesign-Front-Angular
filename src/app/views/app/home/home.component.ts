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
import { UserService } from 'src/app/shared/user.service';
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

  showQuestion = false;


  featuredPosts = [] as Post[];
  recentPosts = [] as Post[];

  constructor(
    private authService: AuthService,
    private notifications: NotificationsService,
    private userService: UserService,
    private postService: PostService,
  ) {

  }

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
      '',
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
      this.userService.getUser(this.authService.user.uid.toString())
        .subscribe(
          (next) => {
            this.showQuestion = (next['user'].role === 'user');
          },
          (error) => { },
          () => { }
        )
    }
    this.userCurrent = this.authService.userCurrent$;

  }

}
