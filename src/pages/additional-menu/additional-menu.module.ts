import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalMenuPage } from './additional-menu';

@NgModule({
  declarations: [
    AdditionalMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalMenuPage),
  ]
})
export class AdditionalMenuPageModule {}
