import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TickettaxiePage } from '../tickettaxie/tickettaxie';
import { TicketHotelPage } from '../ticket-hotel/ticket-hotel';
import { TicketPage } from '../ticket/ticket';

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
    this.navCtrl.push(TickettaxiePage);
  }

  goToHotelTicket(){
     this.navCtrl.push(TicketHotelPage);
  }

  goToRestaurantTicket(){
     this.navCtrl.push(TicketPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsPage');
  }

}
