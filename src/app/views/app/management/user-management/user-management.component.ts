import { Component, OnInit, ViewChild } from '@angular/core';
import { AddNewProductModalComponent } from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ApiService } from 'src/app/data/api.service';
import { IProduct } from 'src/app/data/api.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/models/post.model';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  userAuthorized: firebase.User;
  displayMode = 'image';
  selectAllState = '';

  selected: User[] = [];
  data: User[] = [];

  selected_: IProduct[] = [];
  data_: IProduct[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = 'displayName';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOrder = { label: 'Display Name', value: 'displayName' };
  itemOptionsOrders = [
    { label: 'Display Name', value: 'displayName' },
    { label: 'Email', value: 'email' },
    { label: 'Role', value: 'role' },
    { label: 'Status', value: 'status' }
  ];

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewProductModalComponent;

  constructor(
    private authService: AuthService,
    private hotkeysService: HotkeysService,
    private apiService: ApiService,
    private postService: PostService,
    private userService: UserService
  ) {
    // get user authorized
    this.userAuthorized = this.authService.user;

    this.hotkeysService.add(new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
      this.selected = [...this.data];
      return false;
    }));
    this.hotkeysService.add(new Hotkey('ctrl+d', (event: KeyboardEvent): boolean => {
      this.selected = [];
      return false;
    }));
  }


  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = '') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.userService.getUsers(pageSize, currentPage, search, orderBy).subscribe(
      data => {
        if (true) {
          this.isLoading = false;
          console.log(data['users']);
          this.data = data['users'];
          this.totalItem = data['totalItem'] | 0;
          this.totalPage = data['totalPage'] | 0;
          this.setSelectAllState();
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  changeDisplayMode(mode) {
    this.displayMode = mode;
  }

  showAddNewModal() {
    this.addNewModalRef.show();
  }

  isSelected(u: User) {
    return this.selected.findIndex(x => x.uid === u.uid) > -1;
  }
  onSelect(item: User) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.uid !== item.uid);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.data?.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number) {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any) {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event) {
    // const val = event.target.value.toLowerCase().trim();
    const val = event.target.value.trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }

  onContextMenuClick(action: string, item: IProduct) {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item.title);
  }
}
