import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketPage } from '../ticket/ticket';

/**
 * Generated class for the ServiceRestaurantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-restaurant',
  templateUrl: 'service-restaurant.html',
})
export class ServiceRestaurantPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  createTicket(){
    this.navCtrl.push(TicketPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRestaurantPage');
  }

}
