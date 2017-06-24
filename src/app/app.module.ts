import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import {HttpModule} from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AssistantPage } from '../pages/assistant/assistant';
import { ServicesPage } from '../pages/services/services';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';

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
    LoginPage,
    TabsPage,
    ProfilePage,
   RegisterPage,
    MycomponentComponent,
    ProgressBarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AssistantPage,
    ServicesPage,
    LoginPage,
    TabsPage,
    ProfilePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
<<<<<<< HEAD
    ChatService
=======
    AuthServiceProvider
>>>>>>> 0d5b69497e4d0ceebe48d4e95ac36a62713d2d77
  ]
})
export class AppModule {}
