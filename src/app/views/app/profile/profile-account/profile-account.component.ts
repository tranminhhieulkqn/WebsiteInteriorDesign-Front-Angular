import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html'
})
export class ProfileAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

}
