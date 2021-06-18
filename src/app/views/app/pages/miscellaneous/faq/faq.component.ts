import { Component, OnInit } from '@angular/core';
import faqData, { IFaq } from 'src/app/data/faq';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
 ],
})
export class FaqComponent implements OnInit {
  slides = [
    {image: 'https://c.stocksy.com/a/Vhb300/z9/859909.jpg', text: 'First'},
    
 ];
  noWrapSlides = false;
  showIndicator = true;
  data: IFaq[] = faqData;
  showItemIndex = 0;
  constructor() { }

  ngOnInit() {
  }
}
