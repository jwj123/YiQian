import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SettingPage} from "../setting/setting";
import { Events } from 'ionic-angular';
import { ChangeDetectorRef } from '@angular/core';
import {CategoryListPage} from "../category-list/category-list";
import {QiandaoPage} from "../qiandao/qiandao";
import {QiantuiPage} from "../qiantui/qiantui";
import {QiandaoSituPage} from "../qiandao-situ/qiandao-situ";
import {ChooseCoursePage} from "../choose-course/choose-course";
import {FanweiPage} from "../fanwei/fanwei";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";


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
  user:any;
  constructor(public navCtrl: NavController,public navPram:NavParams,public events: Events,public cd: ChangeDetectorRef
  ,private storage:LocalStorageProvider,public alertCtrl: AlertController) {

    // events.subscribe('phoned', phone => {
    //   HomePage.prototype.myEvent = phone;
    // });
    this.random1=this.ToRandom();
    this.statuss1=this.compare(this.random1);
    this.random2=this.ToRandom();
    this.statuss2=this.compare(this.random2);
    this.random3=this.ToRandom();
    this.statuss3=this.compare(this.random3);
    this.user=this.storage.get('user',0);
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
    if(this.user.username!='teacher')
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '没有权限进行操作',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    this.navCtrl.push(CategoryListPage);
  }
  toQiandao(){
    if(this.user.username=='teacher')
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '没有权限进行操作',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    this.navCtrl.push(QiandaoPage);
  }
  toQiantui(){
    if(this.user.username=='teacher')
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '没有权限进行操作',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    this.navCtrl.push(QiantuiPage);
  }
  toChoose(){
    if(this.user.username!='teacher')
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '没有权限进行操作',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    this.navCtrl.push(ChooseCoursePage);
}
  toFanwei(){
    if(this.user.username!='teacher')
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '没有权限进行操作',
        buttons: ['OK']
      });
      alert.present();
    }
    else
      this.navCtrl.push(FanweiPage);
  }
}
