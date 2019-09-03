import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { GeolocationSettings } from 'src/app/controller/Settings/geolocation-settings';
import { GeofencingnSettings } from 'src/app/controller/Settings/geofencingn-settings';
import { clusterSurnameSettings } from 'src/app/controller/Settings/clusterSurname-settings';
import { DataComponent } from 'src/app/controller/data/data.component';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';




@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.sass']
})
export class SettingsDialogComponent implements OnInit {

geo:boolean=false;
fenceDist:number;
notification:boolean=false;
cluster;
numberOfStones=0
  constructor(private _mainFrameComponent: MainFrameComponent, private _DataComponent: DataComponent , private _geolocation:GeolocationSettings , private _geofencing: GeofencingnSettings,private _clusterSurnameSettings:clusterSurnameSettings ,private _notificationsDialog: NotificationsDialogComponent ) {
  
this._DataComponent.allMarkerList.subscribe(data=> this.numberOfStones=data.length)  
  }


 
  checkBoxNameGeo="Geolocation"
  checkBoxNameFence="Geofencing"
  checkBoxNameNote="Benachrichtigungen"

  ngOnInit() {
    
   this.fenceDist= JSON.parse(localStorage.getItem('geofencingRadar'))

    this._DataComponent.cast_geofencingIsActivated.subscribe(data=>{this.fenceDist=data})

    this._DataComponent.cast_geopositionIsActivated.subscribe(data=>{this.geo=data})

    this._DataComponent.cast_notificationnIsActivated.subscribe(data=>{this.notification=data})

  }


  returnSlide(){
     console.log("slide")
     var a=(<HTMLInputElement>document.getElementById("myRange")).value;
     this.fenceDist=parseInt(  a)

     this._DataComponent.editGeofencingIsActivated(a)

  }


  closeSettings(){
  
    this._mainFrameComponent.switchSettingsDisplay()
    this._mainFrameComponent.switchSubmenue()

  }

  changeGeo($event){
    this._DataComponent.editGeopositionIsActivated($event)
  
  }



  changeClusterSurrname($event){
this._clusterSurnameSettings=$event
  }

changeNotification($event){
  this._DataComponent.editNotificationIsActivated($event)
}







deleteData(){


  if (confirm('Wollen sie wirkliche die Geladenen Steine löschen? Dies entfernt auch die Markierten Steine!')) {
    this._notificationsDialog.deleteSearch()
    this._DataComponent.storeEveryData=[]
    this._DataComponent.editAllMarkerList([])
    
    localStorage.setItem("sd", JSON.stringify([]) )
  
} else {
    // Do nothing!
}

  

}



}


