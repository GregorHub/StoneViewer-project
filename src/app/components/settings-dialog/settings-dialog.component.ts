import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { GeolocationSettings } from 'src/app/controller/Settings/geolocation-settings';
import { GeofencingnSettings } from 'src/app/controller/Settings/geofencingn-settings';
import { clusterSurnameSettings } from 'src/app/controller/Settings/clusterSurname-settings';



@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.sass']
})
export class SettingsDialogComponent implements OnInit {

  constructor(private _mainFrameComponent: MainFrameComponent , private _geolocation:GeolocationSettings , private _geofencing: GeofencingnSettings,private _clusterSurnameSettings:clusterSurnameSettings ) { }

  

 
  checkBoxNameGeo="Geolocation"
  checkBoxNameClusterSurrname="Cluster Nachname"
  checkBoxNameLoc="test2"

geo= this._geolocation.$geolocation
fence=this._geofencing.$geofencing
cluster=this._clusterSurnameSettings.$clusterSurname
  ngOnInit() {
 
   
  }


  closeSettings(){
    this._mainFrameComponent.switchSettingsDisplay()
  }

  changeGeo($event){
    this._geolocation=$event
  }

  changefence($event){
    this._geofencing=$event
  }

  changeClusterSurrname($event){
this._clusterSurnameSettings=$event
  }

}
