import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketHotelPage } from './ticket-hotel';

@NgModule({
  declarations: [
    TicketHotelPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketHotelPage),
  ],
  exports: [
    TicketHotelPage
  ]
})
export class TicketHotelPageModule {}
