import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../providers/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Drawing } from '../../models/drawing/drawing.interface';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  drawings: Observable<any>;
  loadingDrawings: Subscription;

  constructor(private navCtrl: NavController,
    private data: DataService
  ) {
  }

  drawingSelected(drawing: Drawing) {
    this.navCtrl.push('GuessPage', { drawing: drawing });
  }

  ionViewWillEnter() {
    this.drawings = this.data.getDrawings();
  }

}
