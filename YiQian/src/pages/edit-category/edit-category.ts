import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AlterCategoryPage} from "../alter-category/alter-category";
import {CategoryProvider} from "../../providers/category/category";
import {constructDependencies} from "@angular/core/src/di/reflective_provider";

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {
  activeCategory:any;
  name:any;
  activeSubCategories:any;
  selectCategory:any;
  categories:any;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public modalCtrl: ModalController,private categoryService: CategoryProvider) {
    this.activeCategory=this.navParams.get('activeCategory');
    this.categories=this.navParams.get('categories')
    console.log(this.activeCategory);
    this.name=this.activeCategory.name;
    this.activeSubCategories=this.activeCategory.children;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }
  showConfirm(category,flag) {
    this.selectCategory=category;
    let confirm = this.alertCtrl.create({
      title: '你确认要删除吗？',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {

            if(flag==1) {
              let index = this.activeSubCategories.indexOf(category);
              this.activeSubCategories.splice(index, 1);
              this.categoryService.delete(category.id);
            }
            if(flag==0) {
              let index=this.categories.indexOf(category);
              this.categories.splice(index,1);
              this.categoryService.delete(category.id);
              console.log(category.children.length);
              if(category.children.length!=0)
              {
                for(let i=0;i<category.children.length;i++)
                {
                  this.categoryService.delete(category.children[i].id);
                }
                category.children.splice(0,category.children.length);
              }
              this.navCtrl.pop();
            }

          }
        }
      ]
    });
    confirm.present();
  }

  presentModal(category) {
    this.selectCategory=category;
    let modal = this.modalCtrl.create(AlterCategoryPage, {name:this.selectCategory.name });
    modal.onDidDismiss(data => {
      console.log(data);
      this.selectCategory.name=data['name'].toString();
      console.log(this.selectCategory);
      console.log(this.activeCategory.id);
      this.categoryService.save(this.activeCategory.id,this.selectCategory);
    });
    modal.present();
  }

}
