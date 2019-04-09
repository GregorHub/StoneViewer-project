import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule,   SwUpdate,  SwPush} from '@angular/service-worker';
import { environment } from '../environments/environment';
//import { Observable, BehaviorSubject } from 'rxjs';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';
import { InfoPopUpComponent } from './components/info-pop-up/info-pop-up.component';
import { SettingsCheckBoxComponent } from './components/settings-dialog/settings-check-box/settings-check-box.component'; //Observable from rxjs library
import{FormsModule}  from '@angular/forms';
import { GeolocationSettings } from './controller/Settings/geolocation-settings';
import { GeofencingnSettings } from './controller/Settings/geofencingn-settings';
import { Geoposition } from './controller/geoFunctions/geoposition';
import { DataComponent } from './controller/data/data.component';
import { HttpControllerService } from './controller/http-controller.service';
import { clusterSurnameSettings } from './controller/Settings/clusterSurname-settings';
import { Geofencing } from './controller/geoFunctions/geoFencing';
import { NotificationsDialogComponent } from './components/notifications-dialog/notifications-dialog.component';
import { PushNotificationsService } from './controller/push-notifications.service';
import { InfoDashBoardComponent } from './components/info-dash-board/info-dash-board.component';


@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    SettingsDialogComponent,
    MapDialogComponent,
    InfoPopUpComponent,
    SettingsCheckBoxComponent,
    DataComponent,
    NotificationsDialogComponent,
    InfoDashBoardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),   
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    

  ],
  providers: [PushNotificationsService,InfoPopUpComponent ,GeolocationSettings,GeofencingnSettings,Geoposition,clusterSurnameSettings,DataComponent,HttpControllerService,MapDialogComponent,MainFrameComponent,Geofencing, NotificationsDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { 

constructor(update: SwUpdate){

update.available.subscribe(update =>{
  console.log(update)

  if (confirm("Update?") ){
    window.location.reload()
} else {
    // Do nothing!
}

})



}}
