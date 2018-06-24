import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ShopPage} from "../shop/shop";

/**
 * Generated class for the EditshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editshop',
  templateUrl: 'editshop.html',
})
export class EditshopPage {
  title:string;
  property:string;
  phone:string;
  user:any;
  editcon:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private LocalStorage:LocalStorageProvider) {
    this.title = this.navParams.get('title');
    this.property = this.navParams.get('property');
    this.phone=this.navParams.get('phone');
    console.log(this.phone);
    this.user=this.LocalStorage.get('user',0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditshopPage');
  }
  save(){
    this.user[this.property]=this.editcon;
    this.LocalStorage.set('user',this.user);
    this.navCtrl.push(ShopPage);
  }

}
