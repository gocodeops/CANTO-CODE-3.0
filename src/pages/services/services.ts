import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceDetailPage } from '../service-detail/service-detail';
import { TicketsPage } from '../tickets/tickets';

/**
 * Generated class for the ServicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

    itemSelected(item: string){
    this.navCtrl.push(ServiceDetailPage, { serviceType: item });
  }

  openTickets(){
    this.navCtrl.push(TicketsPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

}
