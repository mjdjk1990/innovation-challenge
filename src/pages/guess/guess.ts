import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Drawing } from '../../models/drawing/drawing.interface';
import { Profile } from '../../models/profile/profile.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { DataService } from '../../providers/data.service';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-guess',
  templateUrl: 'guess.html',
})
export class GuessPage {

  private guessCap = 2;

  drawing: Drawing;
  hiddenName: string;
  correct: boolean;
  remainingGuesses: number;
  
  constructor(private navCtrl: NavController, private navParams: NavParams,
    private data: DataService, private auth: AuthService
  ) {
    this.drawing = this.navParams.get('drawing');
    this.hiddenName = this.drawing.name.replace(/[^_]/g, '_ ');
    this.remainingGuesses = this.navParams.get('remainingGuesses') || this.guessCap;
  }

  async submitGuess(guess: string) {
    if (this.remainingGuesses > 0) {
      // update guess count in the DB
      let result = await this.data.incrementDrawingGuessCount(this.drawing);
      if (result) { this.drawing.totalGuesses++; }

      // update guess list in DB
      await this.data.updateGuessHistory(this.drawing, this.auth.uid, guess);

      this.remainingGuesses -= 1;

      // update guess status for the user for this drawing in the DB
      await this.data.updateGuessStatus(this.drawing, this.auth.uid, {remainingGuesses: this.remainingGuesses, hasSolved: (guess === this.drawing.name)});

      if (guess.toLowerCase() === this.drawing.name.toLowerCase()) {
        this.correct = true;
        this.hiddenName = this.drawing.name.split('').join(' ');

        let stopCondition = false;
        Observable.interval(1300)
          .takeWhile(() => !stopCondition)
          .subscribe(i => {
            stopCondition = true;
            this.navCtrl.push('ResultsPage', { hasSolved: true, drawing: this.drawing });
          });

      } else if (this.remainingGuesses <= 0) {
        this.navCtrl.push('ResultsPage', { hasSolved: false, drawing: this.drawing });
      } else {
        // if they get it wrong then fill in any blanks that are correct
        let newHiddenName = [];
        for (let i = 0; i < this.drawing.name.length; i++) {
          if (guess[i] === this.drawing.name[i]) {
            newHiddenName.push(this.drawing.name[i]);
          } else {
            newHiddenName.push('_');
          }
        }
        this.hiddenName = newHiddenName.join(' ');
      }
    }
  }

  //ionViewWillEnter() {
    // get guess status for the user
    // this.data.getGuessStatus(this.drawing, this.auth.uid).subscribe((guessStatus: GuessStatus) => {
    //   if(guessStatus) {
    //     if(guessStatus.remainingGuesses <= 0 || guessStatus.hasSolved) {
    //       this.navCtrl.push('ResultsPage', { hasSolved: guessStatus.hasSolved, drawing: this.drawing });
    //     } else {
    //       this.remainingGuesses = guessStatus.remainingGuesses;
    //     } 
    //   } else {
    //     this.remainingGuesses = this.guessCap;
    //   }
    // });
  //}
}
