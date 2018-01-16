import { NgModule } from '@angular/core';
import { CanvasDrawComponent } from './canvas-draw.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    CanvasDrawComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    CanvasDrawComponent
  ]
})

export class CanvasDrawModule {}