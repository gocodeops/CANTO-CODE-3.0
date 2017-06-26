import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceHotelPage } from './service-hotel';

@NgModule({
  declarations: [
    ServiceHotelPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceHotelPage),
  ],
  exports: [
    ServiceHotelPage
  ]
})
export class ServiceHotelPageModule {}
