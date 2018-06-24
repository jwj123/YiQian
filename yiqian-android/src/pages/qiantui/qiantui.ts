import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the QiantuiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qiantui',
  templateUrl: 'qiantui.html',
})
export class QiantuiPage {
  flag;let=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:LocalStorageProvider
  ,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QiantuiPage');
  }
  qiantui(){
    let qiandaolist:any=this.storage.get('qiandaolist',0);
    let qiandao:any=this.storage.get('qiandao',0);
    for(let j=0;j<=qiandaolist.length;j++)
    {

      if(qiandaolist[j].pai==qiandao.pai&&qiandaolist[j].lie==qiandao.lie&&qiandaolist[j].course==qiandao.course)
      {
        this.flag=true;
        console.log(qiandao);
        qiandaolist.pop(qiandaolist[j]);
        this.storage.remove('qiandao');
        this.storage.set('qiandaolist',qiandaolist);
        const alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '签退成功',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    if(this.flag==false)
    {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '签退失败',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
