import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.sideMenu();
  }

  sideMenu() {  
    this.navigate =   
    [  
    /* { 
      title : 'Contributor',
      url   : 'contribute/address',
      icon  : 'people' 
    },
    { 
      title : 'Delivery Partner',  
      url   : 'delivery/address',  
      icon  : 'bicycle'  
    },  */  
    { 
      title : 'Ways of Help',  
      url   : 'home/activity',  
      icon  : 'medkit'  
    },
    {  
      title : 'Help',  
      url   : '#',  
      icon  : 'help'   
    },  
    {  
      title : 'About us',  
      url   : '#',  
      icon  : 'information-circle'  
    },   
    ];  
   } 

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
