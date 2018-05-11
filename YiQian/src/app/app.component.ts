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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;




  rootPage:any = HomePage;
  phone:string='';
  shopName:string='';
  user:any;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public events: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage:LocalStorageProvider) {
    this.initializeApp();

    let user: any = this.storage.get('user', 0);
    this.events.subscribe('phoned',(data) =>{
      console.log('events',data);
      this.phone=data.phone;
      this.shopName=data.shopName;
    })
    this.pages = [
      { title: '开店论坛', component: HomePage, icon: 'chatboxes' },
      { title: '手机橱窗', component: ListPage, icon: 'create' },
      { title: '邀请有礼', component: ListPage, icon: 'git-merge' },
      { title: '资金账户', component: ListPage, icon: 'cash' },
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
