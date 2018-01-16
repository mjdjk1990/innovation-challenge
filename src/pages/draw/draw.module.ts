import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawPage } from './draw';
import { CanvasDrawModule } from '../../components/canvas-draw/canvas-draw.module';

@NgModule({
  declarations: [
    DrawPage
  ],
  imports: [
    IonicPageModule.forChild(DrawPage),
    CanvasDrawModule
  ],
})
export class DrawPageModule {}
