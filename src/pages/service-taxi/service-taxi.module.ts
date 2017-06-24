import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceTaxiPage } from './service-taxi';

@NgModule({
  declarations: [
    ServiceTaxiPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceTaxiPage),
  ],
  exports: [
    ServiceTaxiPage
  ]
})
export class ServiceTaxiPageModule {}
