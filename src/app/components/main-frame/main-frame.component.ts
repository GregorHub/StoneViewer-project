import { Component, OnInit } from '@angular/core';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.sass']
})
export class MainFrameComponent implements OnInit {

  constructor( private _geoposition: Geoposition ) { }

  localPos=this._geoposition
  toptext="StoneViewer"

  ngOnInit() {
    
   // console.log( this.localPos.$geolocationPosition.coords)

  }

settingsIsHidden=true;
mapIsHidden=false;
InfoPopUpIsHidde=true;





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
