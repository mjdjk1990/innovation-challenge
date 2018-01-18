import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawingHistoryPage } from './drawing-history';
import { UserDetailsModule } from '../../components/user-details/user-details.module';

@NgModule({
  declarations: [
    DrawingHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DrawingHistoryPage),
    UserDetailsModule
  ],
})
export class DrawingHistoryPageModule {}
