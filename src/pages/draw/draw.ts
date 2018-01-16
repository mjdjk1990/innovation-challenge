import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { StorageService } from '../../providers/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Drawing } from '../../models/drawing/drawing.interface';
import { DataService } from '../../providers/data.service';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})
export class DrawPage {

  drawing: Drawing;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private data: DataService,
    private auth: AuthService,
    private storage: StorageService
  ) {
  }

  showLoader(content) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: content
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

  showToast(message) {
    this.toast.create({
      message: message,
      duration: 3000,
      showCloseButton: true
    }).present();
  }

  showAlert(message) {
    this.alertCtrl.create({
      title: `An error occured!`,
      message: message,
      buttons: ['OK'],
      enableBackdropDismiss: false
    }).present();
  }

  showDrawingSelectionOptions() {
    let prompt = this.alertCtrl.create({
      title: 'What will you draw?',
      enableBackdropDismiss: false,
      inputs: [
        {
          type: 'radio',
          checked: true,
          label: 'Kangaroo',
          value: 'kangaroo'
        },
        {
          type: 'radio',
          label: 'Curry',
          value: 'curry'
        }],
      buttons: [
        {
          text: "Cancel",
          cssClass: 'alert__alert-delete-button',
          handler: data => {
            // navigate back to guess page
            this.navCtrl.parent.select(0);
          }
        },
        {
          text: "Draw it!",
          handler: data => {
            this.drawing.name = data;
          }
        }]
    });
    prompt.present();
  }

  async saveCanvas(dataURL) {
    this.showLoader('Uploading artwork...');

    // upload the image
    const snapshot = await this.storage.uploadBase64Image(dataURL, 'drawings', `${this.auth.uid}${Math.floor(Date.now() / 1000)}`);
    if (snapshot['error']) {
      this.showToast(`Unable to upload image! ${snapshot['error']['code']}`);
    }

    // create database entry for drawing
    this.drawing.author = this.auth.uid;
    this.drawing.path = snapshot['downloadURL'];
    this.drawing.dateCreated = new Date().toJSON().toString();
    let result = await this.data.saveDrawing(this.drawing);

    if (!result) {
      this.showAlert('Error saving drawing!');
    } else {
      this.showToast('Drawing created!');
    }
    // navigate back to guess page
    this.navCtrl.parent.select(0);
    this.dismissLoader();
  }

  ionViewWillEnter() {
    this.drawing = {} as Drawing;
    this.showDrawingSelectionOptions();
  }

}