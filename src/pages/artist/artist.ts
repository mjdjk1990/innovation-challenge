import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {

  artist: Profile;
  loadingProfile: Subscription;

  constructor(private navCtrl: NavController, private navParams: NavParams, private data: DataService,
    private view: ViewController) {
  }

  onClose() {
    this.view.dismiss();
  }
  
  ionViewWillLoad() {
    this.loadingProfile = this.data.getUserProfile(this.navParams.get('uid')).subscribe((profile: Profile) => {
      this.loadingProfile.unsubscribe();
      this.artist = profile;
    });
  }

}
