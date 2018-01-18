import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProfilePage } from './create-profile';
import { EditProfileModule } from '../../components/edit-profile/edit-profile.module';

@NgModule({
  declarations: [
    CreateProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProfilePage),
    EditProfileModule
  ],
})
export class CreateProfilePageModule {}
