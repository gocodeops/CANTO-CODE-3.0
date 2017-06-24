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
    
  }

  doSomething(ev){
    console.log(ev);
    this.loadProgress++;
  }


}
