import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {

  constructor(private navCtrl: NavController, private auth: AuthService) {
  }

  logout() {
    this.auth.signOut();
  }

  profileSaved() {
    this.navCtrl.setRoot('TabsPage');
  }

}
