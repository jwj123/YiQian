import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {AddCategoryPage} from "../add-category/add-category";
import {EditCategoryPage} from "../edit-category/edit-category";

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
  categories:any;
  activeCategory:any;
  length:any;
  activeSubCategory:any;
  activeSubCategories:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService: CategoryProvider, public actionSheetCtrl: ActionSheetController) {

    this.categoryService.get().then((data)=>{
      this.categories = data;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
    this.categoryService.get().then((data)=>{
      this.categories = data;

    })
    this.selectCategory(this.categories[0]);
  }
  // selectCategory(items){
  //
  //   let i=0;
  //  for(i;i<6;i++) {
  //     this.activeCategory = this.categories[i];
  //     if(this.activeCategory.name==items) {
  //       this.activeSubCategory = this.activeCategory.children;
  //       if(this.activeCategory==0)
  //         this.name=111;
  //       else
  //         this.name=222;
  //       break;
  //     }
  //   }
  //
  //   this.length=this.activeSubCategory.length;
  //
  // }
  selectCategory(category){
    this.activeCategory=category;
    this.activeSubCategories=this.activeCategory.children;
    this.length=this.activeSubCategories.length;
    this.activeSubCategory=this.activeSubCategories[0];
  }
  selectSubCategory(category){
    this.activeSubCategory=category;
    this.categoryService.updateActiveCategory(category);
    this.navCtrl.pop();
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push(AddCategoryPage,{activeCategory:this.activeCategory,categories:this.categories,flag:false});
            console.log('Destructive clicked');
          }
        },{
          text: '编辑分类',
          handler: () => {
            this.navCtrl.push(EditCategoryPage,{activeCategory:this.activeCategory,categories:this.categories});
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }
  gotoAddCategory(){
    this.navCtrl.push(AddCategoryPage,{activeCategory:this.activeCategory,categories:this.categories,flag:true});
  }


}
