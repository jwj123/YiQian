import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {QiandaoSituPage} from "../qiandao-situ/qiandao-situ";

/**
 * Generated class for the ChooseCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-course',
  templateUrl: 'choose-course.html',
})
export class ChooseCoursePage {
  categories:any;
  courses:string[];
  course:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:LocalStorageProvider,
              private toastCtrl: ToastController,private categoryService: CategoryProvider) {
    this.categoryService.get().then((data)=>{
      this.categories = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseCoursePage');
    this.categoryService.get().then((data)=>{
      this.categories = data;
    });
    console.log(this.categories);
    this.courses=[];
    for(let i=0;i<10;i++)
    {
      if(this.categories[i]!=null)
        this.courses.push(this.categories[i].name);
      else
        break;
    }
  }
  toQiandaoSitu(){
    this.navCtrl.push(QiandaoSituPage,{Course:this.course});
  }

}
