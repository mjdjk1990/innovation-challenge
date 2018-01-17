import { NgModule } from '@angular/core';
import { DrawingsListComponent } from './drawings-list.component';
import { IonicModule } from 'ionic-angular';
import { UserDetailsModule } from '../user-details/user-details.module';
import { GuessStatusDirectiveModule } from '../../directives/guess-status/guess-status.directive.module';

@NgModule({
  declarations: [
    DrawingsListComponent
  ],
  imports: [
    IonicModule,
    UserDetailsModule,
    GuessStatusDirectiveModule
  ],
  exports: [
    DrawingsListComponent
  ]
})

export class DrawingsListModule {}