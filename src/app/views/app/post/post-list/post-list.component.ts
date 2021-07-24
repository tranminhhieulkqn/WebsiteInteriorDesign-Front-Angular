import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { AddNewProductModalComponent } from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import { blogData } from 'src/app/data/blog';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  userAuthorized: firebase.User;
  selectAllState = '';
  selected: Post[] = [];
  data: Post[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = 'title';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOptionsPerPage = [10, 20, 30];
  itemOrder = { label: 'Title Name', value: 'title' };
  itemOptionsOrders = [
    { label: 'Title Name', value: 'title' },
    { label: 'Category', value: 'category' },
    { label: 'Name Author', value: 'displayNameAuthor' }
  ];

  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;

  constructor(
    private authService: AuthService,
    // private hotkeysService: HotkeysService,
    private postService: PostService,
  ) {
    // get user authorized
    this.userAuthorized = this.authService.user;
  }

  ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = 'title') {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.postService.getPostsPublic(pageSize, currentPage, search, orderBy).subscribe(
      data => {
        if (true) {
          this.isLoading = false;
          this.data = data['posts'];
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

  onContextMenuClick(action: string, item: Post) {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item.title);
  }

}
