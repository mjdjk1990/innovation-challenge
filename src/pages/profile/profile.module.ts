import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { EditProfileModule } from '../../components/edit-profile/edit-profile.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    EditProfileModule
  ],
})
export class ProfilePageModule {}
