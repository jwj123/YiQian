import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from "../../pages/share/product";
import {UUID} from 'angular2-uuid';
import {PRODUCTS} from "../../pages/share/mock.products";
import {LocalStorageProvider} from "../local-storage/local-storage";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const PAGE_SIZE=8;
@Injectable()
export class ProductProvider {
  list:Array<Product>;
  totalPrice;
  totalStock;

  constructor(private localStroage:LocalStorageProvider) {
    console.log('Hello ProductProvider Provider');

  }

  add(input: Product): Promise<any> {
      return new Promise((resolve,reject) =>{
        input.id = UUID.UUID();
        let products=this.localStroage.get('Product',PRODUCTS);
        let index=products.length;
        products[index]=input;
        this.set(products);
        })
  }
  get(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!index){
        reject('参数不可为空');
      }
        let products =this.localStroage.get('Product',PRODUCTS);
        let result = products.slice((index-1)*PAGE_SIZE,index*PAGE_SIZE);
        this.total(result);
        resolve(result);
    })
  }

  set(value:any){
    this.localStroage.set('Product',value);

  }
  getByName(name: string,pageIndex:number): Promise<any> {
    return new Promise((resolve,reject) =>{
      this.list=new Array();
      let index,length=0;
      let products=this.localStroage.get('Product',PRODUCTS);
      for(let i=0+(pageIndex-1)*PAGE_SIZE;i<products.length;i++) {
        index=products[i].name.indexOf(name);
        console.log(index);
        if(index!=-1) {
          length++;
          this.list.push(products[i]);
        }
        if(length==PAGE_SIZE)
          break;
      }
      console.log(this.list);
      let result=this.list;
      this.total(result);
      resolve(result);
    })
  }

  getByCategoryId(categoryId: number): Promise<any> {
    return new Promise((resolve,reject) =>{
      this.list=new Array();
      let products=this.localStroage.get('Product',PRODUCTS);
      for(let i=0;i<products.length;i++) {
        if(products[i].categoryId==categoryId){
          this.list.push(products[i]);
        }
      }
      console.log(this.list);
      let result=this.list;
      this.total(result);
      resolve(result);
    })
  }

  total(products:any){
    this.totalPrice=0;
    this.totalStock=0;
    let length=products.length;
    for(let i=0;i<length;i++){
      this.totalPrice=this.totalPrice+products[i].buyingPrice*products[i].stock;
      this.totalStock=this.totalStock+products[i].stock;
    }
  }


}
