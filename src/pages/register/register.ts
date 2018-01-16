import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { Account } from '../../models/account/account.interface';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account = {} as Account;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  showLoader() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Creating account...'
      });
      this.loading.present();
    }
  }

  dismissLoader() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  showAlert(message) {
    this.alertCtrl.create({
      title: `An error occured!`,
      message: message,
      buttons: ['OK'],
      enableBackdropDismiss: false
    }).present();
  }

  async register() {
    this.showLoader();
    const registerResponse = await this.auth.createUserWithEmailAndPassword(this.account);
    if (!registerResponse.error) {

      // send verification email
      this.auth.getAuthenticatedUser().subscribe(user => {
        user.sendEmailVerification().then(() => {
          this.dismissLoader();

          this.toastCtrl.create({
            message: `Verification email sent to ${registerResponse.result.email}!`,
            duration: 3000,
            showCloseButton: true
          }).present();
          
          this.returnToLoginPage();
        })
          .catch(e => {
            this.dismissLoader();
            this.showAlert(e.message);
          });
      });
    } else {
      this.dismissLoader();
      this.showAlert(registerResponse.error.message.substr(registerResponse.error.message.indexOf(":") + 1));
    }
  }

  returnToLoginPage() {
    this.navCtrl.pop();
  }
}
