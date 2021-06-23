import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-user-infor',
  templateUrl: './profile-user-infor.component.html'
})
export class ProfileUserInforComponent implements OnInit {
  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
  }

}
