import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myHomeText: any = "This is the home page";

  loadProgress: any = 0;

  constructor(public navCtrl: NavController) {
    if(this.loadProgress != 100){
      this.loadProgress++
    }
  }

  doSomething(ev){
    console.log(ev);
  }


}
