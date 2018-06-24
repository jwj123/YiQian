import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, NavParams, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {WelcomePage} from "../pages/welcome/welcome";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {SettingPage} from "../pages/setting/setting";
import { Events } from 'ionic-angular';
import {SigninPage} from "../pages/signin/signin";
import {QiandaoPage} from "../pages/qiandao/qiandao";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;




  rootPage:any = HomePage;
  userList:any;
  phone:string='';
  shopName:string='';
  user:any;
  register = {
    phone:'student',
    email:'123@qq.com',
    shopName:'student',
    password:'123456',
    confirmPassword:'',
    code:'',
    registerTime:'',
    shortName:'',
    shopUserName:'',
    shopPhone:'',
  };
  register1 = {
    phone:'teacher',
    email:'1234@qq.com',
    shopName:'teacher',
    password:'123456',
    confirmPassword:'',
    code:'',
    registerTime:'',
    shortName:'',
    shopUserName:'',
    shopPhone:'',
  };
  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public events: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage:LocalStorageProvider) {
    this.initializeApp();

    let user1:any=this.storage.get('userlist',0);
    if(user1==null){
      var userList=new Array();
      userList.push(this.register);
      userList.push(this.register1);
      this.storage.set('userlist', userList);
    }
    else
    {
      user1.push(this.register);
      user1.push(this.register1);
      this.storage.set('userlist', user1);
    }



    let user: any = this.storage.get('user', 0);
    this.events.subscribe('phoned',(data) =>{
      console.log('events',data);
      this.phone=data.phone;
      this.shopName=data.shopName;
    })
    this.pages = [
      { title: '签到', component: QiandaoPage, icon: 'chatboxes' },
      { title: '查看当前考勤情况', component: ListPage, icon: 'create' },
      { title: '查看历史情况', component: ListPage, icon: 'git-merge' },
      { title: '当前考勤情况', component: ListPage, icon: 'cash' },
    ];

    let appConfig:any = this.storage.get('App',{
      isRun:false,
      version:'1.0.0'
    });
    if(user!=null){
      appConfig.isRun=true;
      this.phone=user.phone;
      this.shopName=user.shopName;
    }

    if(appConfig.isRun==false){
      this.rootPage = WelcomePage;

    }
    else{
      this.rootPage = HomePage;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }

  toSetting() {
    this.nav.push(SettingPage);

  }
}
