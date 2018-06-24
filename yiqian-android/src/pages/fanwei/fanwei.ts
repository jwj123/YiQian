import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FanweiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fanwei',
  templateUrl: 'fanwei.html',
})
export class FanweiPage {
   fanwei:any;
   fanweis:number[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.fanweis=[30,50,70,90];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FanweiPage');
  }

  tosetfanwei(){
    const alert1 = this.alertCtrl.create({
      title: '提示',
      subTitle: '设置成功',
      buttons: ['OK']
    });
    alert1.present();
  }
}
