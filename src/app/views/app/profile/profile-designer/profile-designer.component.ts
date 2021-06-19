import { Component, OnInit } from '@angular/core';
import { data,IDesigner } from 'src/app/data/designer';

@Component({
  selector: 'app-profile-designer',
  templateUrl: './profile-designer.component.html',
  styleUrls: ['./profile-designer.component.scss']
})
export class ProfileDesignerComponent implements OnInit {
  datashow = data.slice();
  constructor() { }

  ngOnInit(): void {
  }

}
