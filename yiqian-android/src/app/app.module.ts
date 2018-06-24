import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage} from "../pages/welcome/welcome";
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import {RegisterPage} from "../pages/register/register";
import { AuthenticationCodeProvider } from '../providers/authentication-code/authentication-code';
import {SigninPage} from "../pages/signin/signin";
import{ForgotPasswordPage} from"../pages/forgot-password/forgot-password"
import  {CopyrightComponent} from "../components/copyright/copyright";
import {SettingPage} from "../pages/setting/setting";
import {ShopPage} from "../pages/shop/shop";
import {EditshopPage} from "../pages/editshop/editshop";
import {OurPage} from "../pages/our/our";
import { CategoryProvider } from '../providers/category/category';
import {CategoryListPage} from "../pages/category-list/category-list";
import {AddCategoryPage } from "../pages/add-category/add-category";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import { Geolocation } from '@ionic-native/geolocation';
import {QiandaoPage} from "../pages/qiandao/qiandao";
import {QiantuiPage} from "../pages/qiantui/qiantui";
import {QiandaoSituPage} from "../pages/qiandao-situ/qiandao-situ";
import {ChooseCoursePage} from "../pages/choose-course/choose-course";
import {FanweiPage} from "../pages/fanwei/fanwei";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    SigninPage,
    ForgotPasswordPage,
    CopyrightComponent,
    SettingPage,
    ShopPage,
    EditshopPage,
    OurPage,
    CategoryListPage,
    AddCategoryPage,
    QiandaoPage,
    QiantuiPage,
    QiandaoSituPage,
    ChooseCoursePage,
    FanweiPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', // 配置返回按钮的文字
       // 配置返回按钮的图标
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    SigninPage,
    ForgotPasswordPage,
    CopyrightComponent,
    SettingPage,
    ShopPage,
    EditshopPage,
    OurPage,
    CategoryListPage,
    AddCategoryPage,
    QiandaoPage,
    QiantuiPage,
    QiandaoSituPage,
    ChooseCoursePage,
    FanweiPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    AuthenticationCodeProvider,
    CategoryProvider,
    Geolocation,
  ]
})
export class AppModule {}
