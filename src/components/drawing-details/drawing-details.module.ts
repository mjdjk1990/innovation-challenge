import { NgModule } from '@angular/core';
import { DrawingDetailsComponent } from './drawing-details.component';
import { IonicModule } from 'ionic-angular';
import { UserDetailsModule } from '../user-details/user-details.module';

@NgModule({
  declarations: [
    DrawingDetailsComponent
  ],
  imports: [
    IonicModule,
    UserDetailsModule
  ],
  exports: [
    DrawingDetailsComponent
  ]
})

export class DrawingDetailsModule {}