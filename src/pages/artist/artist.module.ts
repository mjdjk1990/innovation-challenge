import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistPage } from './artist';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ArtistPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistPage),
    PipesModule
  ],
})
export class ArtistPageModule {}
