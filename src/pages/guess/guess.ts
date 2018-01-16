import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../providers/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Drawing } from '../../models/drawing/drawing.interface';

/**
 * Generated class for the GuessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guess',
  templateUrl: 'guess.html',
})
export class GuessPage {

  drawings: Observable<any>;
  loadingDrawings: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: DataService
  ) {
  }

  ionViewWillEnter() {
    this.drawings = this.data.getDrawings();
  }

}
