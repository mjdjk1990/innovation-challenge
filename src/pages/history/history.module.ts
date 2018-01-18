import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { DrawingsListModule } from '../../components/drawings-list/drawings-list.module';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    DrawingsListModule
  ],
})
export class HistoryPageModule {}
