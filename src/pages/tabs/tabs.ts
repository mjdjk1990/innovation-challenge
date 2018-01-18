import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
  tab4Root: string;

  constructor(private navParams: NavParams) {
    this.tab1Root = 'ListPage';
    this.tab2Root = 'DrawPage';
    this.tab3Root = 'HistoryPage';
    this.tab4Root = 'ProfilePage';
  }
}
