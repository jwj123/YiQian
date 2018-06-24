import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the QiandaoSituPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qiandao-situ',
  templateUrl: 'qiandao-situ.html',
})
export class QiandaoSituPage {
  course:any;
  IfQiandao:number[];
  noqiandao:any=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:LocalStorageProvider) {
    this.course=this.navParams.get('Course');
    console.log(this.course);
      this.IfQiandao = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let qiandao:any=this.storage.get('qiandaolist',0);
    for(let i=0;i<qiandao.length;i++)
    {
      if(qiandao[i].course==this.course) {

        let zuohao=(parseInt(qiandao[i].pai)-1)*8+parseInt(qiandao[i].lie);
        console.log(zuohao);
        this.IfQiandao[zuohao]=this.noqiandao;
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QiandaoSituPage');
  }

}
