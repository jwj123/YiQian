import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {ShopPage} from "../shop/shop";
import {OurPage} from "../our/our";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  signinPage:any;
  phone:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  toShop(){
    this.navCtrl.push(ShopPage);
  }
  toOur(){
    this.navCtrl.push(OurPage);
  }
  toOut(){
    this.navCtrl.setRoot(SigninPage);
    this.storage.remove('user');
    this.storage.set('App',{
      isRun:false,
      version:'1.0.0'
    })
  }

}
