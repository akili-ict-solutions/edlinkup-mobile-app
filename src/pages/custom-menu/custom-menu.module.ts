import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomMenuPage } from './custom-menu';

@NgModule({
  declarations: [
    CustomMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomMenuPage),
  ]
})
export class CustomMenuPageModule {}
