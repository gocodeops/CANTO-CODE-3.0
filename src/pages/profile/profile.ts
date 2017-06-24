import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  
  profile = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  }

  pageForm: FormGroup;
 
  submitAttempt: boolean = false;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.profile.id = info['id'];
    this.profile.firstname = info['firstname'];
    this.profile.lastname = info['lastname'];
    this.profile.email = info['email'];
    this.profile.phone = info['phone'];
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  submitForm(){
    this.submitAttempt = true;
 
    if(!this.pageForm.valid){
      console.log("failed!")
    } 
    else {
        console.log("success!")
    }
  }

}
