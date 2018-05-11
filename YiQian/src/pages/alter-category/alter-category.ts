import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {EditCategoryPage} from "../edit-category/edit-category";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the AlterCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alter-category',
  templateUrl: 'alter-category.html',
})
export class AlterCategoryPage {
  name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterCategoryPage');
  }
  dismiss() {
    console.log(this.name);
    this.viewCtrl.dismiss({name: this.name});
  }



}
