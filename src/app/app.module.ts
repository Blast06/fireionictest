import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SubirPage } from './../pages/subir/subir';
import { HomePage } from '../pages/home/home';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Pipes
import { PipesModule } from '../pipes/pipes.module';

//plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from "@ionic-native/image-picker";
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';





export const firebaseConfig = {
  apiKey: "AIzaSyD4FWHXOVVSVvIka7FDgbdXQVMWtjKJ-rE",
  authDomain: "gag-f2126.firebaseapp.com",
  databaseURL: "https://gag-f2126.firebaseio.com",
  projectId: "gag-f2126",
  storageBucket: "gag-f2126.appspot.com",
  messagingSenderId: "899681691978"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CargaArchivoProvider
  ]
})
export class AppModule { }
