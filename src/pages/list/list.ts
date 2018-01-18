import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../providers/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Drawing } from '../../models/drawing/drawing.interface';
import { AuthService } from '../../providers/auth.service';
import { GuessStatus } from '../../models/guess/guess-status.interface';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  drawings: Observable<any>;
  loadingDrawings: Subscription;

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private data: DataService
  ) {
  }

  drawingSelected(drawing: Drawing) {
    //this.navCtrl.push('GuessPage', { drawing: drawing });

    const options: ModalOptions = {
      enableBackdropDismiss: false
    }
    const artistInfoModal: Modal = this.modalCtrl.create('ArtistPage', { uid: drawing.author }, options);
    artistInfoModal.present();

    artistInfoModal.onWillDismiss(data => {
      if (data && data.goToDrawing) {
        // get the guess status data
        this.data.getGuessStatus(drawing, this.auth.uid).subscribe((guessStatus: GuessStatus) => {
          if (guessStatus && (guessStatus.remainingGuesses <= 0 || guessStatus.hasSolved)) {
            this.navCtrl.push('ResultsPage', { hasSolved: guessStatus.hasSolved, drawing: drawing });
          } else {
            this.navCtrl.push('GuessPage', { drawing: drawing, remainingGuesses: guessStatus ? guessStatus.remainingGuesses : null });
          }
        });
      }
    });
  }

  ionViewWillEnter() {
    this.drawings = this.data.getDrawings(this.auth.uid);
  }

}
