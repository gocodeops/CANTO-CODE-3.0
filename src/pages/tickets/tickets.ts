import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TicketTaxie } from '../tickettaxie/tickettaxie';
import { TicketHotel } from '../ticket-hotel/ticket-hotel';
import { TicketRestaurant } from '../ticket/ticket';

/**
 * Generated class for the TicketsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
})
export class TicketsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToTaxiTicket(){
    this.navCtrl.push(TicketTaxie);
  }

  goToHotelTicket(){
     this.navCtrl.push(TicketHotel);
  }

  goToRestaurantTicket(){
     this.navCtrl.push(TicketRestaurant);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }

}
