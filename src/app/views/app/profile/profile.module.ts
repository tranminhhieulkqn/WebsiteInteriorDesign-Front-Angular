import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { ProfileContainersModule } from "./components/profile.containers.module";

import { ProfileComponent } from './profile.component';
import { ProfileSocialComponent } from './profile-social/profile-social.component';
import { ProfilePortfolioComponent } from './profile-portfolio/profile-portfolio.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileAccountComponent,
    ProfileSocialComponent,
    ProfilePortfolioComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule,
    TabsModule.forRoot(),
    LayoutContainersModule,
    BsDropdownModule.forRoot(),
    ProfileContainersModule,
    NgSelectModule,
    FormValidationsContainersModule,
    WizardsContainersModule,
    SimpleNotificationsModule.forRoot(),
    BootstrapModule
  ]
})
export class ProfileModule { }
