import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SettingPage} from "../setting/setting";
import { Events } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import {CategoryListPage} from "../category-list/category-list";
import {AddProductPage} from "../add-product/add-product";
import {ProductListPage} from "../product-list/product-list";


@Component({
  selector: 'page-home',
  templateUrl:'home.html'
})
export class HomePage {
  phone:string;
  random1:number;
  random2:number;
  random3:number;
  random:number;
  statuss1:string;
  statuss2:string;
  statuss3:string;
  statuss:string;

  constructor(public navCtrl: NavController,public navPram:NavParams,public events: Events,public cd: ChangeDetectorRef) {

    // events.subscribe('phoned', phone => {
    //   HomePage.prototype.myEvent = phone;
    // });
    this.random1=this.ToRandom();
    this.statuss1=this.compare(this.random1);
    this.random2=this.ToRandom();
    this.statuss2=this.compare(this.random2);
    this.random3=this.ToRandom();
    this.statuss3=this.compare(this.random3);
  }
  toSetting(){
    this.navCtrl.push(SettingPage);
  }
  compare(random){
    console.log(random);
    if(random>0){
      this.statuss="arrow-round-up"
    }
    if(random<0){
      this.statuss="arrow-round-down"
    }
    if(random=0){
      this.statuss="arrow-round-forward"
    }
    return this.statuss;

  }
  ToRandom(){
    this.random=Math.random()*20-10;
    return  this.random;

  }
  toCate(){
    this.navCtrl.push(CategoryListPage);
  }
  toAddProcuct(){
    this.navCtrl.push(AddProductPage);

  }
  toProductList(){
    this.navCtrl.push(ProductListPage);
  }
}
