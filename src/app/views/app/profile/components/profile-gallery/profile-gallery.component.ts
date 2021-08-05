import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html'
})
export class ProfileGalleryComponent implements OnInit {

  // gallerySmall = [
  //   {
  //     src: 'img/tea-loaf.jpg',
  //     thumb: '/assets/img/tea-loaf-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/magdalena.jpg',
  //     thumb: '/assets/img/magdalena-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/marble-cake.jpg',
  //     thumb: '/assets/img/marble-cake-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/parkin.jpg',
  //     thumb: '/assets/img/parkin-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/napoleonshat.jpg',
  //     thumb: '/assets/img/napoleonshat-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/fruitcake.jpg',
  //     thumb: '/assets/img/fruitcake-thumb.jpg',
  //   },
  // ];

  // galleryXlarge = [
  //   {
  //     src: '/assets/img/fruitcake.jpg',
  //     thumb: '/assets/img/fruitcake.jpg',
  //   },
  //   {
  //     src: '/assets/img/marble-cake.jpg',
  //     thumb: '/assets/img/marble-cake.jpg',
  //   }
  // ];

  // galleryLarge = [
  //   {
  //     src: '/assets/img/parkin.jpg',
  //     thumb: '/assets/img/parkin-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/magdalena.jpg',
  //     thumb: '/assets/img/magdalena-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/napoleonshat.jpg',
  //     thumb: '/assets/img/napoleonshat-thumb.jpg',
  //   },
  //   {
  //     src: '/assets/img/marble-cake.jpg',
  //     thumb: '/assets/img/marble-cake-thumb.jpg',
  //   }
  // ];
  gallerySmall = [
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

  galleryXlarge = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00296.jpg?alt=media&token=980e5e73-905b-4ed0-b79f-e9dc9b153183',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00296.jpg?alt=media&token=980e5e73-905b-4ed0-b79f-e9dc9b153183',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00336.jpg?alt=media&token=95735b81-5785-49af-b86b-0382f27b6520',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00336.jpg?alt=media&token=95735b81-5785-49af-b86b-0382f27b6520',
    }
  ];

  galleryLarge = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00705.jpg?alt=media&token=ab079128-1440-452a-92f9-40524f9de6ce',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00705.jpg?alt=media&token=ab079128-1440-452a-92f9-40524f9de6ce',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00674.jpg?alt=media&token=6a6c1001-832c-49f3-af66-8c99d3b81d35',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00674.jpg?alt=media&token=6a6c1001-832c-49f3-af66-8c99d3b81d35',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00705.jpg?alt=media&token=ab079128-1440-452a-92f9-40524f9de6ce',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00705.jpg?alt=media&token=ab079128-1440-452a-92f9-40524f9de6ce',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00780.jpg?alt=media&token=fef604ea-834d-455e-9d3e-fc861d9aac31',
      thumb: 'https://firebasestorage.googleapis.com/v0/b/interior-design-afc76.appspot.com/o/assets%2Ffavorites%2FIndustrial%2FIndustrial_00780.jpg?alt=media&token=fef604ea-834d-455e-9d3e-fc861d9aac31',
    }
  ];

  constructor(private lightbox: Lightbox) { }

  ngOnInit() {
  }

  openLightbox(gallery, index: number): void {
    this.lightbox.open(gallery, index, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

}
