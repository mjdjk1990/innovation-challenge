import { Component } from '@angular/core';
import { IonicPage, NavController, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { DataService } from '../../providers/data.service';
import { AuthService } from '../../providers/auth.service';
import { Observable } from 'rxjs/Observable';
import { Drawing } from '../../models/drawing/drawing.interface';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  drawings: Observable<any>;

  constructor(
    private navCtrl: NavController, 
    private modalCtrl: ModalController,
    private data: DataService,
    private auth: AuthService
  ) {
  }

  drawingSelected(drawing: Drawing) {
    const options: ModalOptions = {
      enableBackdropDismiss: false
    }
    const drawingHistoryModal: Modal = this.modalCtrl.create('DrawingHistoryPage', { drawing: drawing }, options);
    drawingHistoryModal.present();
  }

  ionViewWillLoad() {
    this.drawings = this.data.getMyDrawings(this.auth.uid);
  }

}
