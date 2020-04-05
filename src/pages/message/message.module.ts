import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';

@NgModule({
  imports: [
    IonicPageModule.forChild(MessagePage),
  ],
})
export class MessagePageModule {}
