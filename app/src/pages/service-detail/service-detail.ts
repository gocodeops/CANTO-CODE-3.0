import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ServiceTaxiPage } from '../service-taxi/service-taxi';
import { ServiceHotelPage } from '../service-hotel/service-hotel';
import { ServiceRestaurantPage } from '../service-restaurant/service-restaurant';

/**
 * Generated class for the ServiceDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html',
})
export class ServiceDetailPage {
    serviceType: string ;

    static get parameters() {
      return [[NavController], [NavParams]];
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.serviceType = this.navParams.get('serviceType');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailPage');
  }

  itemSelected(item){
    switch(this.serviceType){
      case "taxi":
        this.navCtrl.push(ServiceTaxiPage, {serviceID: item})
      break;

      case "hotel":
        this.navCtrl.push(ServiceHotelPage, {serviceID: item})
      break;

      case "restaurant":
        this.navCtrl.push(ServiceRestaurantPage, {serviceID: item})
      break;
    }
  }

}
