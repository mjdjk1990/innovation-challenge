import { Component, EventEmitter, Output } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { Subscription } from 'rxjs/Subscription';
import { Loading, Platform, ToastController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth.service';
import { DataService } from '../../providers/data.service';
import { StorageService } from '../../providers/storage.service';
import OFFICES from '../../shared/offices';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent {

  @Output('profileSaved') profileSaved: EventEmitter<void>;

  profile = {} as Profile;
  loadingProfile: Subscription;
  loading: Loading;
  isCore: boolean;
  photo: string;
  offices = OFFICES;

  constructor(
    private camera: Camera,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthService,
    private data: DataService,
    private storage: StorageService
  ) {
    this.profileSaved = new EventEmitter<void>();
    if (this.platform.is('core') || (this.platform.is('mobileweb'))) {
      this.isCore = true;
    }
    this.profile = {
      firstName: null,
      lastName: null,
      avatar: null,
      email: null,
      office: null,
      quote: null
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
    this.refreshAvatar();
  }

  async save(valid) {
    if (valid) {
      this.showLoader('Saving profile...');
      let result = await this.data.saveUserProfile(this.auth.uid, this.profile);
      if (!result) {
        this.showAlert('Error saving profile!');
      } else {
        this.showToast('Profile updated!');
        this.profileSaved.emit();
      }
      this.dismissLoader();
    } else {
      this.showAlert('All fields are required!');
    }
  }

  // refreshProfile() {
  //   let uid = this.auth.uid;

  //   if (uid) {
  //     this.loadingProfile = this.data.getUserProfile(uid).subscribe((profile: Profile) => {
  //       if (profile) {
  //         this.profile = profile;
  //       }
  //       this.loadingProfile.unsubscribe();
  //     });
  //   }
  // }

  refreshAvatar() {
    this.data.getUserProfile(this.auth.uid).subscribe((profile: Profile) => {
      if (profile) {
        this.profile.avatar = profile.avatar;
      }
    });
  }

  ngOnInit() {
    // this.refreshProfile();
    let uid = this.auth.uid;
    if (uid) {
      this.loadingProfile = this.data.getUserProfile(uid).subscribe((profile: Profile) => {
        if (profile) {
          this.profile = profile;
        }
        this.loadingProfile.unsubscribe();
      });
    }
  }

}
