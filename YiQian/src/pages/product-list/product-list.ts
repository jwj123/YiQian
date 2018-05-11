import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Product} from "../share/product";
import {ProductProvider} from "../../providers/product/product";
import {CategoryListPage} from "../category-list/category-list";
import {CategoryProvider} from "../../providers/category/category";
import {AddCategoryPage} from "../add-category/add-category";
import {AddProductPage} from "../add-product/add-product";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  loader: any;
  TotalStock:any;
  TotalPrice:any;
  private pageIndex = 1;
  products: Product[];
  name:any;
  input:any;
  categoryId:any;
  length:any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private productService: ProductProvider,
              private categoryService:CategoryProvider,private events:Events) {
    this.TotalPrice=0;
    this.TotalStock=0;

    this.categoryId=this.categoryService.activeCategory.id;

    this.events.subscribe('category:update',(data) =>{
      console.log('events',data);
      this.categoryId=data.id;
      this.productService.getByCategoryId(this.categoryId).then((data)=>{
        this.products=data;
        this.length=this.products.length;
        this.TotalStock=this.productService.totalStock;
        this.TotalPrice=this.productService.totalPrice;
        console.log(data)
      })
    })
  }

  ionViewDidLoad() {
    this.input=false;
    //console.log(this.input);
    console.log('ionViewDidLoad ProductListPage');
    this.load();

  }
  load(){
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "正在加载数据，请稍候..."
    });
    this.loader.present();

    this.productService.get(this.pageIndex).then((data) => {
      this.loader.dismiss();
      this.products = data;
      this.TotalStock=this.productService.totalStock;
      this.TotalPrice=this.productService.totalPrice;
      this.length=this.products.length;
    }, (error) => {
    });
  }

  onInput(event){
    let value =event.target.value;
    this.input=value;
    value=value.trim();
    console.log('onInput',value)
    if(value.length!=0){
      this.productService.getByName(value,1).then((data)=>{
        this.products=data;
        this.length=this.products.length;
        this.TotalStock=this.productService.totalStock;
        this.TotalPrice=this.productService.totalPrice;
      })

    }
    if(value.length==0){
      this.input=false;
      console.log(this.input);
      setTimeout(()=>{
      this.productService.get(this.pageIndex).then((data) => {
        this.products = data;
        this.length=this.products.length;
        this.TotalStock=this.productService.totalStock;
        this.TotalPrice=this.productService.totalPrice;
      })
      },1000)

    }
  }

  doRefresh(refresher){
    this.pageIndex = 1;
    if(this.input==false) {
      setTimeout(()=>{
      this.productService.get(this.pageIndex).then((data) => {
          this.products = data;
        refresher.complete();
      }, (error) => {
      });
      },1000)
    }
    if(this.input!=false){
      setTimeout(()=>{
        this.productService.getByName(this.input,this.pageIndex).then((data)=>{
          this.products=data;
          this.length=this.products.length;
          this.TotalStock=this.productService.totalStock;
          this.TotalPrice=this.productService.totalPrice;
          refresher.complete();
        })
      },1000)
    }
  }

  doInfinite(event){
    this.pageIndex++;
    if(this.input==false) {
      setTimeout(()=> {
      this.productService.get(this.pageIndex).then((data) => {
        this.products = this.products.concat(data);
        event.complete();
      }, (error) => {
      });
      },1000)
    }
    else{
      setTimeout(()=> {
        this.productService.getByName(this.input,this.pageIndex).then((data) => {
          this.products = this.products.concat(data);
          this.length = this.products.length;
          this.TotalStock = this.productService.totalStock;
          this.TotalPrice = this.productService.totalPrice;
          event.complete();
        })
      },1000)

    }

  }

  toCategory(){
    this.navCtrl.push(CategoryListPage);
}
  gotoAddCategory(){
    this.navCtrl.push(AddProductPage);
  }


}
