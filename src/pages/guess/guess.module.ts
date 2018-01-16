import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuessPage } from './guess';
import { DrawingsListModule } from '../../components/drawings-list/drawings-list.module';

@NgModule({
  declarations: [
    GuessPage,
  ],
  imports: [
    IonicPageModule.forChild(GuessPage),
    DrawingsListModule
  ],
})
export class GuessPageModule {}
