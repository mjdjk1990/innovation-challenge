import { NgModule } from '@angular/core';
import { DrawingsListComponent } from './drawings-list.component';
import { IonicModule } from 'ionic-angular';
import { UserDetailsModule } from '../user-details/user-details.module';

@NgModule({
  declarations: [
    DrawingsListComponent
  ],
  imports: [
    IonicModule,
    UserDetailsModule
  ],
  exports: [
    DrawingsListComponent
  ]
})

export class DrawingsListModule {}