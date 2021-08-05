// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'https://api.coloredstrategies.com',
  // apiBackUrl: 'https://interiordesign-back.herokuapp.com/',
  apiBackUrl: 'http://localhost:3000/',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: false,
  /*
  Color Options:
  'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss', 'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot', 'light.redruby', 'light.purplemonster'
  'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss', 'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot', 'dark.redruby', 'dark.purplemonster'
  */
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: true,
  firebase: {
    apiKey: "AIzaSyBphYt75FCefv7bzB4n3k2gV8RSbXoelMA",
    authDomain: "interior-design-afc76.firebaseapp.com",
    databaseURL: "https://interior-design-afc76-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "interior-design-afc76",
    storageBucket: "interior-design-afc76.appspot.com",
    messagingSenderId: "975443254622",
    appId: "1:975443254622:web:99a8860c8a1840f6f103cf",
    measurementId: "G-DZ11BZMHEB"
  }
};
