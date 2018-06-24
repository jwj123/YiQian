import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Category} from "../share/category";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  activeCategory:Category;
  categories:Category[]=[];
  items:Category[]=[];
  // item:Category;
  itemId:any;
  flag:any;
  name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService: CategoryProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
    this.categoryService.get().then((data)=>{
      this.categories = data;
    });
  }

  save(){
      let id = 6;
      let item = {
        id: 1,
        name: '',
      };
      item.id = id;
      item.name = this.name;
      console.log(item);
      this.categories.push(item);
    console.log(this.categories);
      this.categoryService.save(id, this.categories[id - 1]);
      this.navCtrl.pop();

    // let length=this.items.length;
    // for(let i=0;i<length;i++) {
    //   this.categoryService.save(this.activeCategory.id, this.items[i]);
    //   console.log(this.items[i].name);
    //   console.log(this.items[i].id);
    // }
}


}
