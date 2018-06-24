import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {SigninPage} from "../signin/signin";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  toRegister(){
    this.navCtrl.push(RegisterPage);

  }
  toSignin(){

    this.navCtrl.push(SigninPage);

  }
}
