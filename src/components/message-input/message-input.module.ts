import { NgModule } from '@angular/core';
import { MessageInputComponent } from './message-input.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    MessageInputComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MessageInputComponent
  ]
})

export class MessageInputModule {}