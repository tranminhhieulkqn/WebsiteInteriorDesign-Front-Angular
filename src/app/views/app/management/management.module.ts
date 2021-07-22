import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule } from '@angular/router';
import { PostManagementComponent } from './post-management/post-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing';


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
  ]
})
export class ManageModule { }
