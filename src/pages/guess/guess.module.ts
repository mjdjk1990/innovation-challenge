import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuessPage } from './guess';
import { UserDetailsModule } from '../../components/user-details/user-details.module';
import { MessageInputModule } from '../../components/message-input/message-input.module';

@NgModule({
  declarations: [
    GuessPage,
  ],
  imports: [
    IonicPageModule.forChild(GuessPage),
    UserDetailsModule,
    MessageInputModule
  ],
})
export class GuessPageModule {}
