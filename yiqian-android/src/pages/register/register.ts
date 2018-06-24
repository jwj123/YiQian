import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import { ToastController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {WelcomePage} from "../welcome/welcome";
import {HomePage} from "../home/home";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('registerSlides') registerSlides:any;
  userList:any;
  register = {
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private authenticationCodeService:AuthenticationCodeProvider,
              private storage:LocalStorageProvider,private toastCtrl: ToastController,public events: Events) {
  }


//字符串'registerSlides'和模板中的#registerSlides引用变量的名称一致
  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipeToNext(true);
  }
  next(){
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipeToNext(true);
  }
  previous() {
    this.registerSlides.slidePrev()
  }
  send(){
    console.log(this.authenticationCodeService.createCode(4));
    let toast = this.toastCtrl.create({
      message: this.authenticationCodeService.createCode(4),
      duration: 2000,
      position: 'middle'
    })

    toast.present();
    //没有使用短信云服务发送验证码，先在控制台输出生成的验证码
  }
  validateCode(){
    console.log();
    if(this.authenticationCodeService.validate(this.register.code)){
      this.next();
    }
    else{
      console.log('短信验证码不正确或者已过期');
    }
  }
  registerOver(){
    if(this.register.password==this.register.confirmPassword) {
      var date = new Date();
      this.register.registerTime=date.toDateString();
      //this.storage.set(this.register.phone,this.register);
      let user:any=this.storage.get('userlist',0);
      if(user==null) {
        var userList=new Array();
        userList.push(this.register);
        console.log(this.register)
        this.storage.set('userlist', userList);
        this.storage.set('user',this.register);
      }
      else{
        user.push(this.register);
        console.log(this.register)
        this.storage.set('userlist', user);
        this.storage.set('user',this.register);
      }


      this.next();
    }
    else{
      let toast = this.toastCtrl.create({
        message: '密码输入不一致',
        duration: 2000,
        position: 'middle'
      })

      toast.present();

    }


  }

  toSignin(){
    let appConfig:any = this.storage.get('App',{
      isRun:true,
      version:'1.0.0'
    });
    this.storage.set('App',appConfig);
    this.events.publish('phoned',this.register);
    this.navCtrl.setRoot(HomePage);
  }

}
