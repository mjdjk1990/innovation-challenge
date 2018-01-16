import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { DrawingsListModule } from '../../components/drawings-list/drawings-list.module';

@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    DrawingsListModule
  ],
})
export class ListPageModule {}
