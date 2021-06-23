import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostList1Component } from './post-list1/post-list1.component';

const routes: Routes = [
  {
    path: '', component: PostComponent,
    children: [
      { path: '', redirectTo: 'post-list', pathMatch: 'full' },
      { path: 'post-list', component: PostListComponent },
      { path: 'post-list1', component: PostList1Component },
      { path: 'post-detail', component: PostDetailComponent },
      { path: 'post-create', component: PostCreateComponent },
      { path: 'post-manage', component: PostManageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
