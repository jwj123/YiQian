import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {EditshopPage} from "../editshop/editshop";
import { ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  phone:string;
  shopName:string;
  email:string;
  registerTime:string;
  shortName:string;
  editshopPage:any;
  shopUserName:string;
  shopPhone:string;

  constructor(public cd: ChangeDetectorRef,public navCtrl: NavController, public navParams: NavParams,private LocalStorage:LocalStorageProvider) {
    this.editshopPage=EditshopPage;
    let user:any=this.LocalStorage.get('user',0);
    console.log(user.phone);
    this.phone=user.phone;
    this.shopName=user.shopName;
    console.log(this.shopName);
    this.email=user.email;
    this.registerTime=user.registerTime;
    this.shortName=user.shortName;
    this.shopPhone=user.shopPhone;
    this.shopUserName=user.shopUserName;



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');

  }


}
