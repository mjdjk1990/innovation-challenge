import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { Drawing } from '../../models/drawing/drawing.interface';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  drawing: Drawing;
  profile: Observable<any>;
  hasSolved: boolean;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private data: DataService
  ) {
    this.hasSolved = this.navParams.get('hasSolved');
    this.drawing = this.navParams.get('drawing');
  }

  goBack() {
    this.navCtrl.parent.select(0);
  }

  viewArtist() {
    const options: ModalOptions = {
      enableBackdropDismiss: false
    }
    const artistInfoModal: Modal = this.modalCtrl.create('ArtistPage', { uid: this.drawing.author }, options);
    artistInfoModal.present();
  }

  ionViewWillLoad() {
    this.profile = this.data.getUserProfile(this.drawing.author);
  }

}
