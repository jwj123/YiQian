import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {CATEGORIES} from "../../pages/share/mock.categories";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {Category} from "../../pages/share/category";
import {Subject} from "rxjs/Subject";
import {Events} from "ionic-angular";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  activeCategory:any;
  categorySubject=new Subject<any>();

  constructor(private localStorageService:LocalStorageProvider,private events:Events) {
    console.log('Hello CategoryProvider Provider');
  }
  get() {
    return Promise.resolve(this.localStorageService.get('Category', CATEGORIES));
  }

  delete(pid:number){
    let data:Category[]=this.localStorageService.get('Category', CATEGORIES);
    data.forEach((value,index) => {
      if(value.id==pid) {
        data.splice(index,1);
      }
    });
    this.set(data);

  }

  set(value:any){
    this.localStorageService.set('Category',value);

  }
  save(pid:number,category:Category){
    let flag:boolean=false;
    let data:Category[]=this.localStorageService.get('Category', CATEGORIES);
    data.forEach((value,index) => {
      if(value.id==pid){
        if(category.id==pid){
          data[index]=category;
        }
        flag=true;
      }
    });
    if(flag==false){
      data.push(category);
    }
    this.set(data);
  }

  updateActiveCategory(category:any){
    this.activeCategory.id=category.id;
    this.activeCategory.name=category.name;
    this.events.publish('category:update',this.activeCategory);
  }


}
