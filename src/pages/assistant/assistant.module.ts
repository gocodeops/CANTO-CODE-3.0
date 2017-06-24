import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistantPage } from './assistant';

@NgModule({
  declarations: [
    AssistantPage,
  ],
  imports: [
    IonicPageModule.forChild(AssistantPage),
  ],
  exports: [
    AssistantPage
  ]
})
export class AssistantPageModule {}
