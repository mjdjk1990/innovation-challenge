import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { StorageService } from '../../providers/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Drawing } from '../../models/drawing/drawing.interface';
import { DataService } from '../../providers/data.service';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/profile/profile.interface';
import DRAWING_IDEAS from '../../shared/drawing-ideas';
import { Utilities } from '../../shared/utilities';

@IonicPage()
@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})
export class DrawPage {

  drawing: Drawing;
  loading: Loading;

  drawingIdeas = DRAWING_IDEAS;

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

  showInputErrorAlert() {
    this.alertCtrl.create({
      title: `Invalid entry!`,
      message: 'Drawing name must be bewteen 2 and 10 characters and not contain spaces, special characters or numbers!',
      buttons: [{text: 'OK', handler: () => this.showCustomInputAlert() }],
      enableBackdropDismiss: false
    }).present();
  }

  showCustomInputAlert() {
    let prompt = this.alertCtrl.create({
      title: 'What will you draw?',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'input',
          placeholder: 'Drawing name'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          cssClass: 'alert__alert-cancel-button',
          handler: data => {
            this.showDrawingSelectionOptions();
          }
        },
        {
          text: "Draw it!",
          handler: data => {
            if(!data.input.match(/^[a-zA-Z_\-]{3,10}$/)) {
              this.showInputErrorAlert();
            } else {
              this.drawing.name = data.input.toLowerCase();
            }
          }
        }
      ]
    }).present();
  }

  showDrawingSelectionOptions() {
    let drawingOptions = [];
    drawingOptions = Utilities.shuffle(DRAWING_IDEAS);
    drawingOptions = drawingOptions.slice(0, 3);

    let prompt = this.alertCtrl.create({
      title: 'What will you draw?',
      enableBackdropDismiss: false,
      inputs: [
        {
          type: 'radio',
          checked: true,
          label: drawingOptions[0],
          value: drawingOptions[0]
        },
        {
          type: 'radio',
          label: drawingOptions[1],
          value: drawingOptions[1]
        },
        {
          type: 'radio',
          label: drawingOptions[2],
          value: drawingOptions[2]
        },
        {
          type: 'radio',
          label: 'I want to do my own drawing!',
          value: 'user_select'
        }
      ],
      buttons: [
        {
          text: "Refresh",
          cssClass: 'alert__alert-refresh-button',
          handler: data => {
            this.showDrawingSelectionOptions();
            // navigate back to guess page
            //this.navCtrl.parent.select(0);
          }
        },
        {
          text: "Draw it!",
          handler: data => {
            if (data === 'user_select') {
              this.showCustomInputAlert();
            } else {
              this.drawing.name = data;
            }
          }
        }
      ]
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