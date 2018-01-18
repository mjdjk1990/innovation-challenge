import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Drawing } from '../../models/drawing/drawing.interface';
import { DataService } from '../../providers/data.service';
import { Utilities } from '../../shared/utilities';

@IonicPage()
@Component({
  selector: 'page-drawing-history',
  templateUrl: 'drawing-history.html',
})
export class DrawingHistoryPage {

  drawing: Drawing;
  guesses: any[] = [];

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private data: DataService,
    private view: ViewController
  ) {
    this.drawing = this.navParams.get('drawing');
  }

  close() {
    this.view.dismiss();
  }

  getGuessedWord(guess) {
    return Object.keys(guess)[0];
  }

  fromNow(date: string) {
    //console.log(date);
    return Utilities.fromNow(date);
  }

  ionViewWillLoad() {
    this.data.getGuessesForDrawing(this.drawing).subscribe(data => {
      Object.keys(data).forEach(key => {
        let guessData = { user: null, guesses: [] };
        guessData.user = key;

        Object.keys(data[key]).forEach(guessKey => {
          guessData.guesses.push({ guess: guessKey, timestamp: data[key][guessKey]});
        });
        this.guesses.push(guessData);
      });
      console.log(this.guesses);
    });
  }

}
