import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRestaurantPage } from './service-restaurant';

@NgModule({
  declarations: [
    ServiceRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRestaurantPage),
  ],
  exports: [
    ServiceRestaurantPage
  ]
})
export class ServiceRestaurantPageModule {}
