import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { data, IDesigner } from 'src/app/data/designer';
import follow, { IFollow } from 'src/app/data/follow';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-designer',
  templateUrl: './profile-designer.component.html',
})
export class ProfileDesignerComponent implements OnInit {
  datashow = data.slice();

  // data: IFollow[] = follow.slice();

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
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
  ) {
    // get user authorized
    this.userAuthorized = this.authService.user;
  }

  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy, this.role);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = 'displayName', role: string = 'designer') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.userService.getAllByRole(pageSize, currentPage, search, orderBy, 'designer').subscribe(
      data => {
        if (true) {
          this.isLoading = false;
          this.data = data['users'];
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
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy, this.role);
  }

  itemsPerPageChange(perPage: number) {
    this.loadData(perPage, 1, this.search, this.orderBy, this.role);
  }

  changeOrderBy(item: any) {
    this.loadData(this.itemsPerPage, 1, this.search, item.value, this.role);
  }

  searchKeyUp(event) {
    // const val = event.target.value.toLowerCase().trim();
    const val = event.target.value.trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy, this.role);
  }

  onContextMenuClick(action: string, item: User) {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item?.displayName);
  }

}
