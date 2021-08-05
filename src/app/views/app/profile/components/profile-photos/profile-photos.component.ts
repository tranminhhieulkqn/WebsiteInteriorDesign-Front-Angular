import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html'
})
export class ProfilePhotosComponent implements OnInit {
  album = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00057.jpg?alt=media&token=d993cd8a-e64b-422b-b389-f366030382dc',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00057.jpg?alt=media&token=d993cd8a-e64b-422b-b389-f366030382dc',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00089.jpg?alt=media&token=d14677b4-52e4-4b28-a3e3-0d81b98a7f9c',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00089.jpg?alt=media&token=d14677b4-52e4-4b28-a3e3-0d81b98a7f9c',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00282.jpg?alt=media&token=6d09b5ca-394f-484c-b4cc-de6a90d402f1',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00282.jpg?alt=media&token=6d09b5ca-394f-484c-b4cc-de6a90d402f1',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00201.jpg?alt=media&token=af0decc1-cad8-42b4-a9a2-c443203fe601',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00201.jpg?alt=media&token=af0decc1-cad8-42b4-a9a2-c443203fe601',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00452.jpg?alt=media&token=d73b2406-1f28-453b-a9ec-56e3172fe2c7',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndochina%2FIndochina_00452.jpg?alt=media&token=d73b2406-1f28-453b-a9ec-56e3172fe2c7',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00296.jpg?alt=media&token=980e5e73-905b-4ed0-b79f-e9dc9b153183',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00331.jpg?alt=media&token=b61f4a0c-022b-4e04-afc7-baa281561e57',
    },
  ];
  constructor(private lightbox: Lightbox) {
  }

  openLightbox(index: number): void {
    this.lightbox.open(this.album, index, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

  close(): void {
    this.lightbox.close();
  }


  ngOnInit() {
  }

}
