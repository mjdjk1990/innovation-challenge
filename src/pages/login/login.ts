import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Account } from '../../models/account/account.interface';
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account = {} as Account;
  loading: Loading;
  passwordHidden: boolean = true;

  authenticatedUser$: Subscription;
  authenticatedUser: User;

  profile: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private data: DataService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  showLoader() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Signing in...'
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

  async login() {
    this.showLoader();
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);

    if (!loginResponse.error) {
      this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe(user => {
        user.reload();

        // user verified
        if (user.emailVerified) {
          this.data.getUserProfile(loginResponse.result.uid).subscribe(profile => {
            // check for profile data.
            // if no profile go to create profile page, otherwise go to main page
            if (!profile) {
              this.data.saveUserProfile(user.uid, {
                firstName: null,
                lastName: null,
                avatar: null,
                email: user.email,
                office: null
              });
            }
            //profile ? this.navCtrl.push('HomePage') : this.navCtrl.push('ProfilePage');
            this.navCtrl.push('TabsPage');
            this.dismissLoader();
          });
        } else {
          this.dismissLoader();
          this.showAlert('Email verification required. Please verify your email and try again');
        }
      });
    } else {
      this.dismissLoader();
      this.showAlert(loginResponse.error.message.substr(loginResponse.error.message.indexOf(":") + 1));
    }
  }

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLeave() {
    this.authenticatedUser$.unsubscribe();
  }

}
