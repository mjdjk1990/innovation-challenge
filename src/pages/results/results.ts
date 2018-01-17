import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { Drawing } from '../../models/drawing/drawing.interface';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs/Observable';
import { Utilities } from '../../shared/utilities';

export interface OtherGuesses {
  uid: string;
  guess: string;
  timestamp: string;
}

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  drawing: Drawing;
  profile: Observable<any>;
  hasSolved: boolean;
  otherGuesses: OtherGuesses[] = [];

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

  fromNow(date: string) {
    return Utilities.fromNow(date);
  }

  shuffle(a) {
    return Utilities.shuffle(a);
  }

  randomProperty(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
  };

  ionViewWillLoad() {
    this.profile = this.data.getUserProfile(this.drawing.author);
    this.data.getGuessesForDrawing(this.drawing).subscribe(data => {
      // top level keys in data object are user IDs. Shuffle them and put them in an array
      let shuffledUsers = this.shuffle(Object.keys(data));

      // take the first 5 elements of the array
      shuffledUsers = shuffledUsers.slice(0, 5);

      // get one random guess for each of the users we've picked
      shuffledUsers.forEach(user => {
        let randomProperty = this.randomProperty(data[user]);

        this.otherGuesses.push({uid: user, guess: randomProperty, timestamp: data[user][randomProperty]});
      });
    });
  }

}
