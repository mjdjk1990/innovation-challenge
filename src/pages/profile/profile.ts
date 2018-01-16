import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data.service';
import { User } from 'firebase/app';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { StorageService } from '../../providers/storage.service';
import { Camera } from '@ionic-native/camera';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  loadingProfile: Subscription;
  loading: Loading;
  isCore: boolean;
  photo: string;

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthService,
    private data: DataService,
    private storage: StorageService
  ) {
    if (this.platform.is('core') || (this.platform.is('mobileweb'))) {
      this.isCore = true;
    }
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

  showAlert(message) {
    this.alertCtrl.create({
      title: `An error occured!`,
      message: message,
      buttons: ['OK'],
      enableBackdropDismiss: false
    }).present();
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true
    }).present();
  }

  onDisplayPicture() {
    if (!this.isCore) {
      this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Take Photo',
            handler: () => {
              this.takePhoto();
            }
          },
          {
            text: 'From Gallery',
            handler: () => {
              this.selectPhoto();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    }
  }

  async takePhoto() {
    this.showLoader('Please wait...');
    try {
      const image = await this.camera.getPicture({
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        targetHeight: 500,
        targetWidth: 500
      });

      this.photo = 'data:image/png;base64,' + image;
      this.dismissLoader();
      this.uploadPhoto();
    }
    catch (e) {
      console.error(e);
      this.showAlert(e.message || 'Error getting photo information');
      this.dismissLoader();
    }
  }

  async selectPhoto() {
    try {
      this.showLoader('Please wait...');
      const image = await this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 500,
        targetWidth: 500
      });

      this.photo = 'data:image/png;base64,' + image;
      this.dismissLoader();
      this.uploadPhoto();
    }
    catch (e) {
      console.error(e);
      this.showAlert(e.message || 'Error getting photo information');
      this.dismissLoader();
    }
  }

  async onChangePhoto($event: any) {
    this.showLoader('Please wait...');
    let reader = new FileReader();
    reader.onload = () => {
      this.dismissLoader();
      this.photo = reader.result;
      this.uploadPhoto();
    };
    reader.readAsDataURL((<HTMLInputElement>event.target).files[0]);
  }

  async uploadPhoto() {
    this.showLoader('Uploading photo...');
    const snapshot = await this.storage.uploadBase64Image(this.photo, `profile`, `profile-picture`);
    this.dismissLoader();

    if (!snapshot) {
      this.showAlert('Error uploading profile picture!');
    } else {
      // update the user profile with the snapshot download URL
      const result = await this.data.updateUserAvatar(this.auth.uid, snapshot['downloadURL']);
      if (result) {
        this.showToast('Avatar updated');
      } else {
        this.showAlert('Error updating avatar!');
      }
    }
    this.refreshProfile();
  }

  async save() {
    this.showLoader('Saving profile...');
    let result = await this.data.saveUserProfile(this.auth.uid, this.profile);
    if(!result) {
      this.showAlert('Error saving profile!');
    } else {
      this.showToast('Profile updated!');
    }
    this.dismissLoader();
  }

  refreshProfile() {
    let uid = this.auth.uid;

    if(uid) {
      this.loadingProfile = this.data.getUserProfile(uid).subscribe((profile: Profile) => {
        this.loadingProfile.unsubscribe();
        this.profile = profile;
      });
    }
  }

  ionViewWillLoad() {
    this.refreshProfile();
  }
}
