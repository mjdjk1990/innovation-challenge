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

  constructor() {
    this.tab1Root = 'GuessPage';
    this.tab2Root = 'DrawPage';
    this.tab3Root = 'ProfilePage';
  }
}
