import { Component, OnInit } from '@angular/core';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';
import { PwaServiceService } from 'src/app/controller/pwa-service.service';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';


@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.sass']
})
export class MainFrameComponent implements OnInit {

  constructor( private _geoposition: Geoposition, private _geofencing:Geofencing ,public Pwa: PwaServiceService ) { }

  localPos=this._geoposition
  toptext="StoneViewer"

  ngOnInit() {


      
      


   // console.log( this.localPos.$geolocationPosition.coords)

  }

settingsIsHidden=true;
mapIsHidden=false;
InfoPopUpIsHidde=true;
NotificationsDialogIsHidden=true;
NewNotifications=true;



switchNewNotifications(){

  if(this.NewNotifications==true){
    this.NewNotifications=false;
  }else{
    this.NewNotifications=true;
  }
  }


switchNotificationsDisplay(){

  if(this.NotificationsDialogIsHidden==true){
    this.NotificationsDialogIsHidden=false;
  
  if(this.NewNotifications==false){
      this.switchNewNotifications()}
  }else{
    this.NotificationsDialogIsHidden=true;
  }
  }

/**
 * on/off Switch for Settings
 */
switchSettingsDisplay(){

if(this.settingsIsHidden==true){
  this.settingsIsHidden=false;
}else{
  this.settingsIsHidden=true;
}
}
/**
 * on/off Switch for Map
 */
switchmapIsHidden(){
  if(this.mapIsHidden==true){
    this.mapIsHidden=false;
  }else{
    this.mapIsHidden=true;
}
}
/**
 * on/off Switch for InfoPopUp
 */
switchInfoPopUpIsHidde(){
    if(this.InfoPopUpIsHidde==true){
      this.InfoPopUpIsHidde=false;
    }else{
      this.InfoPopUpIsHidde=true;
}
}
  



}
