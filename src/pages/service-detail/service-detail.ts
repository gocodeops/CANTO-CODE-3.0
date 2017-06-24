import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    console.log(this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailPage');
  }

}
