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
  categories:Category[];
  items:Category[]=[];
  // item:Category;
  itemId:any;
  flag:any;
  name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService: CategoryProvider) {
    this.activeCategory=this.navParams.get('activeCategory');
    this.categories=this.navParams.get('categories');
    this.flag=this.navParams.get('flag');
    console.log(this.flag);
    let item;
    item={
      id:1,
      name:'',
      children:[]
    };

    if(this.flag==false) {

      if(this.activeCategory.children.length!=0) {
        item.id += this.activeCategory.children[this.activeCategory.children.length - 1].id;
      }
      else
        item.id=(this.activeCategory.id)*10+1
      this.itemId = item.id;
    }
    else {
      item.id=(this.categories[this.categories.length-1].id+1)*10+1;
      this.itemId=item.id;
      console.log(item.id);
    }
    this.items.push(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  addSubCategory(){
    let item:Category={
      id:1,
      name:'',
      children:[]
    };
    item.id=this.itemId;
    item.id++;
    this.itemId=item.id;
    //  if(!this.activeCategory.children){
    //    this.item.id+=this.activeCategory.children[this.activeCategory.children.length-1].id;
    //  }
    this.items.push(item);

  }
  save(){
    if(this.flag==false) {
      let length = this.items.length;
      for (let i = 0; i < length; i++) {
        this.activeCategory.children.push(this.items[i]);
      }
      console.log(this.activeCategory.id);
      this.categoryService.save(this.activeCategory.id, this.activeCategory);
    }
    else {
      let id = this.categories[this.categories.length - 1].id + 1;
      let item = {
        id: 1,
        name: '',
        children: []
      };
      item.id = id;
      item.name = this.name;
      this.categories.push(item);
      this.categoryService.save(id, this.categories[id - 1]);


      let length = this.items.length;
      console.log(length);
      if(length!=0) {
        for (let i = 0; i < length; i++) {
          this.categories[id - 1].children.push(this.items[i]);
          this.categoryService.save(id,this.items[i]);
        }
        console.log(item.id);
        this.categoryService.save(id, this.categories[id - 1]);
      }
    }
    this.navCtrl.pop();

    // let length=this.items.length;
    // for(let i=0;i<length;i++) {
    //   this.categoryService.save(this.activeCategory.id, this.items[i]);
    //   console.log(this.items[i].name);
    //   console.log(this.items[i].id);
    // }
}


}
