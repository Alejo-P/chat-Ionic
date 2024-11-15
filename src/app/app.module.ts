import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore'
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { firebaseConfig } from '../environments/environment';

@NgModule({
 declarations: [AppComponent],
 imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  FirestoreModule
],
  providers: [
 { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
 provideFirebaseApp(() => initializeApp(firebaseConfig)),
 provideAuth(() => getAuth()),
 provideDatabase(() => getDatabase())
 ],
 bootstrap: [AppComponent]
})
export class AppModule {}