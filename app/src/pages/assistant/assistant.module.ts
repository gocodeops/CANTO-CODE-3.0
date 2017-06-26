import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistantPage } from './assistant';
import {ChatService} from "../../providers/chat-service";
import {RelativeTime} from "../../pipes/relative-time";

@NgModule({
  declarations: [
    AssistantPage,
     RelativeTime
  ],
  imports: [
    IonicPageModule.forChild(AssistantPage)
  ],
  exports: [
    AssistantPage,
  ],
  providers:[
    ChatService
  ]
})
export class AssistantPageModule {}
