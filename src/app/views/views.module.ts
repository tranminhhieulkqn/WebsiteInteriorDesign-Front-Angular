import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { LayoutContainersModule } from '../containers/layout/layout.containers.module';
import { SimpleNotificationsComponent, SimpleNotificationsModule } from 'angular2-notifications';
import { BootstrapModule } from '../components/bootstrap/bootstrap.module';

@NgModule({
  declarations: [ViewsComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    BootstrapModule
  ]
})
export class ViewsModule { }
