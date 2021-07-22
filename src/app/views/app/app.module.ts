import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HomeComponent } from './home/home.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BootstrapModule } from "../../components/bootstrap/bootstrap.module";
import { UiCardsContainersModule } from 'src/app/containers/ui/cards/ui.cards.containers.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { MomentModule } from "ngx-moment";
import { AboutUsComponent } from './about-us/about-us.component';
import { LightboxModule } from 'ngx-lightbox';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    BlankPageComponent,
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    MakeAppointmentComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    BootstrapModule,
    LayoutContainersModule,
    UiCardsContainersModule,
    ComponentsCarouselModule,
    MomentModule,
    LightboxModule,
    WizardsContainersModule,
    FormValidationsContainersModule,
    ArchwizardModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ]
})
export class AppModule { }


