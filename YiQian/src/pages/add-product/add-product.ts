import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryListPage} from "../category-list/category-list";
import {Product} from "../share/product";
import {CategoryProvider} from "../../providers/category/category";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import {ProductProvider} from "../../providers/product/product";
import {ProductListPage} from "../product-list/product-list";


/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product:Product;
  name:any;
  barcode:any;
  remark:any;
  specification:any;
  stock:any;
  price:any;
  images:any;
  length:any;
  buyingPrice:any;
  supplierName:string;
  supplierPhone:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events,private categoryService:CategoryProvider
  ,private barcodeScanner: BarcodeScanner,private camera: Camera,private imagePicker: ImagePicker,private alertCtrl:AlertController
              ,private productService:ProductProvider) {
        this.product=new Product();
    this.product.images=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    this.product.images=[];
    this.images=this.product.images;
    this.product.categoryName=this.categoryService.activeCategory.name;
    this.product.categoryId=this.categoryService.activeCategory.id;
    this.events.subscribe('category:update',(data) =>{
      console.log('events',data);
      this.product.categoryName=data.name;
      this.product.categoryId=data.id;
    })
  }

  saveAndNew(){
    this.save(1);
    this.navCtrl.setRoot(AddProductPage);

  }
  save(i){
    this.product.name=this.name;
    this.product.images=this.images;
    this.product.buyingPrice=this.buyingPrice;
    this.product.price=this.price;
    this.product.barcode=this.barcode;
    this.product.stock=this.stock;
    this.product.remark=this.remark;
      this.productService.add(this.product);
      if(i==0)
        this.navCtrl.push(ProductListPage);

  }
  toCategory(){
    this.navCtrl.push(CategoryListPage);
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.product.barcode = barcodeData.text;
      this.barcode=barcodeData.text;
    }, (err) => {

    });
  }
  cameraPictre() {

    const options: CameraOptions = {
      targetHeight:80,
      targetWidth:80,
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }
  pickImage() {
    let i;
    if(this.product.images.length!=3)
      i=3-this.product.images.length;// 判断是否设置了三张图片
    let options = {
      maximumImagesCount:i,// 计算出最多能选几张
      width: 80,
      height: 80,
      quality: 80,
      outputType: 1,
  };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        // console.log('Image URI: ' + results[i]);
        this.product.images.push('data:image/jpeg;base64,'+results[i]);
      }
    }, (err) => { });
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'name',
          placeholder: '名称'
        },
        {
          name: 'phone',
          placeholder: '电话'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            this.product.supplierPhone=data.phone;
            this.product.supplierName=data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  choose(){
    let prompt = this.alertCtrl.create({
      title: '选择照片',
      buttons: [
        {
          text: '相册',
          handler: data => {
            this.pickImage();
          }
        },
        {
          text: '拍照',
          handler: data => {
            this.cameraPictre();
          }
        }
      ]
    });
    prompt.present();

}


}
