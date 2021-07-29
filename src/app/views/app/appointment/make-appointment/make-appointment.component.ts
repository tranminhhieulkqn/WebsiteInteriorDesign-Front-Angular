import { Component, ElementRef, OnInit, ViewChild, DoCheck, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';

declare var paypal: any;
declare var transactionDetails: any;

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
})
export class MakeAppointmentComponent implements OnInit, DoCheck {

  @ViewChild('paypalRef', { static: true }) private paypalRef: ElementRef;

  userCurrent = {} as firebase.User;
  designerID: string = '';
  designerInfo = {} as User;
  designerInfo_ = {} as User;
  userCurrentInfo = {} as User;
  // form: FormGroup;
  bsValue = new Date();
  dateRange: Date[];
  maxDate = new Date();
  basicTime = new Date();
  bsInlineValue = new Date();

  transactionDetails: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private appointmentService: AppointmentService
  ) {
    // clear last transaction
    this.localStorageService.remove('transactionDetails');
    this.getParamFromURL()
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.dateRange = [this.bsValue, this.maxDate];
  }

  ngDoCheck(): void {
    if (!this.transactionDetails)
      this.transactionDetails = window.localStorage.getItem('transactionDetails')
  }

  ngOnInit(): void {
    this.getUserCurrent();
    this.getDesignerInfo();
    this.getUserCurrentInfo();
    this.renderPaypal();
  }

  getParamFromURL() {
    this.route.queryParams.subscribe(
      (next) => this.designerID = next['id'],
      (error) => console.log(error),
      () => { } // complete
    )
  }

  getUserCurrent() {
    this.userCurrent = this.authService.user;
  }

  getUserCurrentInfo() {
    this.userService.getUser(this.userCurrent.uid.toString())
      .subscribe(
        (next) => {
          this.userCurrentInfo = next['user']
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

  getDesignerInfo() {
    this.userService.getUser(this.designerID)
      .subscribe(
        (next) => {
          this.designerInfo = next['user']
          this.designerInfo_ = Object.assign({}, this.designerInfo);
          this.designerInfo.email = this.emailHidden(this.designerInfo.email)
          this.designerInfo.phone = this.haftHidden(this.designerInfo.phone)
        },
        (error) => console.log(error),
        () => { } // complete
      )
  }

  haftHidden(string: string) {
    var len = string?.length;
    if (!len) {
      return '';
    }
    return string.substring(0, len / 2).padEnd(len, "*")
  }

  emailHidden(string: string) {
    let emailSplit = string.split('@')
    emailSplit[0] = this.haftHidden(emailSplit[0])
    return emailSplit[0] + "@" + emailSplit[1]
  }

  renderPaypal() {
    paypal.Buttons({
      // Set up style for button
      style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay',
        height: 40,
        width: 400,
      },
      // Set up the transaction
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01', // 0.015
            }
          }]
        });
      },
      // Finalize the transaction
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          // Successful capture! For demo purposes:
          // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          window.localStorage['transactionDetails'] = JSON.stringify(orderData, null, 2);
        });
      }
    }).render(this.paypalRef.nativeElement)
  }

  checkPersonalInfo(form: NgForm) {
    let value = form.value
    return !(value.displayNameC && value.emailC && value.phoneC && value.addressC)
  }

  checkAppointmentDetails(form: NgForm) {
    let value = form.value
    return !(value.dateRange?.length && value.location)
  }

  clickSubmitButton(form: NgForm) {
    form.value.transactionDetails = this.transactionDetails;
    form.value.customerID = this.userCurrentInfo.uid || this.userCurrentInfo['id'];
    form.value.designerID = this.designerInfo.uid || this.designerInfo['id'];
    form.value.emailD = this.designerInfo_.email;
    form.value.phoneD = this.designerInfo_.phone;
    form.value.dateCreated = new Date()
    console.log(form.value);
    this.appointmentService.addAppointment(form.value as Appointment)
      .subscribe(
        (next) => {
          console.log(next);
        },
        (error) => console.log(),
        () => { }
      )
  }

  ngOnDestroy() {
    this.localStorageService.remove('transactionDetails');
  }

  // handle with reload page
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event): void {
    console.log("Processing beforeunload...");
    this.localStorageService.remove('transactionDetails');
  }

  // handle with close page
  @HostListener('window:beforeunload', ['$event']) onWindowClose(event: Event): void {
    console.log("Processing beforeunload...");
    this.localStorageService.remove('transactionDetails');
  }

}
