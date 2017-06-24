import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AssistantPage } from '../pages/assistant/assistant';
import { ServicesPage } from '../pages/services/services';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { ServiceDetailPage } from '../pages/service-detail/service-detail';
import { ServiceTaxiPage } from '../pages/service-taxi/service-taxi';
import { ServiceHotelPage } from '../pages/service-hotel/service-hotel';
import { ServiceRestaurantPage } from '../pages/service-restaurant/service-restaurant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MycomponentComponent } from '../components/mycomponent/mycomponent';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import {ChatService} from "../providers/chat-service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AssistantPage,
    ServicesPage,
    ServiceDetailPage,
    ServiceTaxiPage,
    ServiceHotelPage,
    ServiceRestaurantPage,
    LoginPage,
    TabsPage,
    ProfilePage,
    MycomponentComponent,
    ProgressBarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ProfilePage,
    AssistantPage,
    ServicesPage,
    ServiceDetailPage,
    ServiceTaxiPage,
    ServiceHotelPage,
    ServiceRestaurantPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatService,
    AuthServiceProvider
  ]
})
export class AppModule {}
