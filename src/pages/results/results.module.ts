import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsPage } from './results';
import { UserDirectiveModule } from '../../directives/user/user.directive.module';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsPage),
    UserDirectiveModule
  ],
})
export class ResultsPageModule {}
