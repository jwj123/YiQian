import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {
  username:string = '';//视图模型的属性账号，双向绑定
  password:string = '';//视图模型的属性密码，双向绑定
  userInfo = {
    phone:'',
    email:'',
    shopName:'',
    password:'',
    confirmPassword:'',
    code:'',
    registerTime:'',
    shortName:'',
    shopUserName:'',
    shopPhone:'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,
              private alertCtrl:AlertController,private localStorageService:LocalStorageProvider,public events: Events) {
  }

  toHome(){
    this.navCtrl.setRoot(HomePage);
    //this.navCtrl.push(HomePage);

  }

  login(){
    var tag=0;
    if(this.username==null) {
      let toast = this.toastCtrl.create({
        message: '用户名不能为空',
        duration: 2000
      });
      toast.present();
    }
    else {
      let usernameConfig:any=this.localStorageService.get('userlist',0);
      for(var i=0;i<usernameConfig.length;i++)
      {
        if(usernameConfig[i].password==this.password&&usernameConfig[i].phone==this.username){
          tag=1;
          this.userInfo.phone=usernameConfig[i].phone;
          this.userInfo.shopName=usernameConfig[i].shopName;
          this.userInfo.password=usernameConfig[i].password;
          this.userInfo.registerTime=usernameConfig[i].registerTime;
          this.userInfo.email=usernameConfig[i].email;
          this.userInfo.shortName=usernameConfig[i].shortName;
          this.userInfo.shopUserName=usernameConfig[i].shopUserName;
          this.userInfo.shopPhone=usernameConfig[i].shopPhone;
          break;
        }
      }
      if(tag==0)
      {
        let alert = this.alertCtrl.create({
          title: '提示',
          message: '用户名或者密码不正确',
          buttons: ['确定']
        });
        alert.present();
      }
      else
      {
        let appConfig:any = this.localStorageService.get('App',{
          isRun:true,
          version:'1.0.0'
        });
        this.localStorageService.set('user',this.userInfo);
        this.localStorageService.set('App',appConfig);
        this.events.publish('phoned',this.userInfo);
        this.toHome();
      }
    }
    //
  }
  //点击忘记密码时调用
  toForgotPassword(){
    //进入找回密码页面
    this.navCtrl.push(ForgotPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }




}
