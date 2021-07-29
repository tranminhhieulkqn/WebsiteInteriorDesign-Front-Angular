import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/shared/appointment.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
})
export class AppointmentDetailsComponent implements OnInit {

  appointmentID: string = ''
  appointment = {} as Appointment;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {
    this.getParamFromURL();
  }

  ngOnInit(): void {
    this.getAppointment();
  }

  getParamFromURL() {
    this.route.queryParams.subscribe(
      (next) => this.appointmentID = next['id'],
      (error) => {
        console.log(error);
      },
      () => { } // complete
    )
  }

  getAppointment() {
    this.appointmentService.getAppointmentByID(this.appointmentID?.toString())
      .subscribe(
        (next) => {
          this.appointment = next['appointment']
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

}
