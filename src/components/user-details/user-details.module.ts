import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [UserDetailsComponent],
	imports: [IonicModule],
	exports: [UserDetailsComponent]
})
export class UserDetailsModule {}
