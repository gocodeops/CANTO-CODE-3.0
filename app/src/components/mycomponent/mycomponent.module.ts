import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MycomponentComponent } from './mycomponent';

@NgModule({
  declarations: [
    MycomponentComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MycomponentComponent
  ]
})
export class MycomponentComponentModule {}
