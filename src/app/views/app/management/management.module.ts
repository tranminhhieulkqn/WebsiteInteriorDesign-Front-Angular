import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule } from '@angular/router';
import { PostManagementComponent } from './post-management/post-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing';

import { EllipsisModule } from 'ngx-ellipsis';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

import { TranslateModule } from '@ngx-translate/core';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { BsDatepickerModule, BsDropdownModule, RatingModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { QuillModule } from 'ngx-quill';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    ManagementComponent,
    UserManagementComponent,
    PostManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    ManagementRoutingModule,
    LayoutContainersModule,
    EllipsisModule,
    PaginationModule,
    TranslateModule,
    PaginationModule.forRoot(),
    BootstrapModule,
    FormsModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgSelectModule,
    DropzoneModule,
    QuillModule.forRoot(),
    ComponentsCarouselModule,
    HotkeyModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    PagesContainersModule,
    MomentModule
  ]
})
export class ManageModule { }
