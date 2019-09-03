import { Component, OnInit } from '@angular/core';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';
import { PwaServiceService } from 'src/app/controller/pwa-service.service';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';

import { NgxIndexedDB } from 'ngx-indexed-db';



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


  }


settingsIsHidden=true;
mapIsHidden=false;
InfoPopUpIsHidde=true;
NotificationsDialogIsHidden=true;
NewNotifications=true;
submenueIsHidden=true;
helpIsHidden=true;
gallerieIsHidden=false;
mapsettingsIsHidden=true;
dialogBoxIsHidden=true;

switchMapsettingsIsHidden(){

  if(this.mapsettingsIsHidden==true){
    this.mapsettingsIsHidden=false;
  }else{
    this.mapsettingsIsHidden=true;
  }
  }


switchGallerieIsHidden(){

  if(this.gallerieIsHidden==true){
    this.gallerieIsHidden=false;
  }else{
    this.gallerieIsHidden=true;
  }
  }


switchHelpIsHidden(){

  if(this.helpIsHidden==true){
    this.helpIsHidden=false;
  }else{
    this.helpIsHidden=true;
  }
  }





switchSubmenue(){





  if(this.submenueIsHidden==true){
    this.submenueIsHidden=false;
  }else{
    this.submenueIsHidden=true;
  }
  }



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
  

switchdialogBoxIsHidden(){

  if(this.dialogBoxIsHidden==true){
    this.dialogBoxIsHidden=false;
  }else{
    this.dialogBoxIsHidden=true;
  }
  }




}
