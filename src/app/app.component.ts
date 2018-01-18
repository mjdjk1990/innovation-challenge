import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';
import { DataService } from '../providers/data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private auth: AuthService, private data: DataService
  ) {
    let globalActions = function () {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }

    this.auth.getAuthenticatedUser().subscribe(user => {
      if (user && user.emailVerified) {
        //this.rootPage = 'TabsPage';
        this.data.getUserProfile(user.uid).subscribe(profile => {
          // check for first name since a profile can exist with just an avatar. Quick and dirty and who cares
          if (profile['firstName']) {
            this.rootPage = 'TabsPage';
          } else {
            this.rootPage = 'CreateProfilePage';
          }
        });
      } else {
        this.rootPage = 'LoginPage';
      }
      globalActions();
    });
  }
}
