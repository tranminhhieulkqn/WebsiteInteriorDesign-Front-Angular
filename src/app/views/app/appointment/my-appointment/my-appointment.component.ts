import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Lightbox } from 'ngx-lightbox';
import { User } from 'src/app/models/user.model';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { PredictResultService } from 'src/app/shared/predict-result.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
})
export class MyAppointmentComponent implements OnInit {

  userAuthorized: firebase.User;
  data: User[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  role = 'admin'
  orderBy = 'displayName';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOptionsPerPage = [10, 20, 30];

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;



  constructor(
    private lightbox: Lightbox,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private predictResultService: PredictResultService,
    private appointmentService: AppointmentService
  ) {
    // get user authorized
    this.userAuthorized = this.authService.user;
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.userAuthorized.uid);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, userID: string = '') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;

    this.appointmentService.getAppointmentByUser(pageSize, currentPage, userID, 'user').subscribe(
      data => {
        if (true) {
          this.isLoading = false;
          this.data = data['appointments'];
          this.totalItem = data['totalItem'] | 0;
          this.totalPage = data['totalPage'] | 0;
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
  }


  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.userAuthorized.uid);
  }

  itemsPerPageChange(perPage: number) {
    this.loadData(perPage, 1, this.userAuthorized.uid);
  }

  changeOrderBy(item: any) {
    this.loadData(this.itemsPerPage, 1, this.userAuthorized.uid);
  }

  onContextMenuClick(action: string, item: User) {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item?.displayName);
  }

}
