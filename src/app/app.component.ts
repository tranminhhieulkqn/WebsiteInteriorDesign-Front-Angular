import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { LangService } from './shared/lang.service';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;
  constructor(
    private langService: LangService,
    private renderer: Renderer2,
    private titleService: Title
  ) {
    this.titleService.setTitle("Interior Design Website");
  }

  ngOnInit() {
    this.langService.init();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}
