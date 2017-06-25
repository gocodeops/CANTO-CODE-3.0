import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TickettaxiePage } from './tickettaxie';

@NgModule({
  declarations: [
    TickettaxiePage,
  ],
  imports: [
    IonicPageModule.forChild(TickettaxiePage),
  ],
  exports: [
    TickettaxiePage
  ]
})
export class TickettaxiePageModule {}
