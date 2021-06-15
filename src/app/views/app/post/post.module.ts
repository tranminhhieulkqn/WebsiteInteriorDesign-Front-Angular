import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post.routing';

import { EllipsisModule } from 'ngx-ellipsis';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostContainersModule } from './components/post.containers.module';
import { TranslateModule } from '@ngx-translate/core';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { PostManageComponent } from './post-manage/post-manage.component';

@NgModule({
  declarations: [PostComponent, PostListComponent, PostDetailComponent, PostManageComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    LayoutContainersModule,
    EllipsisModule,
    PaginationModule,
    TranslateModule,
    PostContainersModule,
    PaginationModule.forRoot(),
    BootstrapModule,
    FormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgSelectModule,
    SimpleNotificationsModule.forRoot(),
  ]
})
export class PostModule { }
