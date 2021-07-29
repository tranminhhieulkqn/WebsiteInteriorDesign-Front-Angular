import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { UiCardsContainersModule } from 'src/app/containers/ui/cards/ui.cards.containers.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { MomentModule } from "ngx-moment";
import { LightboxModule } from 'ngx-lightbox';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { AppointmentRoutingModule } from './appointment.routing';
import { AppointmentComponent } from './appointment.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { MyAppointmentComponent } from './my-appointment/my-appointment.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { ContextMenuModule } from 'ngx-contextmenu';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    MakeAppointmentComponent,
    MyAppointmentComponent,
    AppointmentDetailsComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    BootstrapModule,
    UiCardsContainersModule,
    ComponentsCarouselModule,
    LightboxModule,
    WizardsContainersModule,
    FormValidationsContainersModule,
    ArchwizardModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    HotkeyModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    PagesContainersModule,
    MomentModule
  ],
  exports: [

  ]
})
export class AppointmentModule { }


