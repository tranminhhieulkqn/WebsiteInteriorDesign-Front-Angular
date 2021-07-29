import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentComponent } from './appointment.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { MyAppointmentComponent } from './my-appointment/my-appointment.component';


const routes: Routes = [
  {
    path: '', component: AppointmentComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'make-appointment', component: MakeAppointmentComponent },
      { path: 'my-appointment', component: MyAppointmentComponent },
      { path: 'appointment-details', component: AppointmentDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
