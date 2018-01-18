import { NgModule } from '@angular/core';
import { DrawingsListComponent } from './drawings-list.component';
import { IonicModule } from 'ionic-angular';
import { DrawingDetailsModule } from '../drawing-details/drawing-details.module';

@NgModule({
  declarations: [
    DrawingsListComponent
  ],
  imports: [
    IonicModule,
    DrawingDetailsModule
  ],
  exports: [
    DrawingsListComponent
  ]
})

export class DrawingsListModule {}