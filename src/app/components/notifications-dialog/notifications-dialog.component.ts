import { Component, OnInit } from '@angular/core';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';
import { DataComponent } from 'src/app/controller/data/data.component';
import { marker } from 'src/app/controller/marker';
import { InfoPopUpComponent } from '../info-pop-up/info-pop-up.component';
import { PushNotificationsService } from 'src/app/controller/push-notifications.service';

import {
  EventEmitter,
  Output
} from '@angular/core';
import { view } from 'src/app/controller/Settings/view';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

export interface PushNotification {
  body ? : string;
  icon ? : string;
  tag ? : string;
  data ? : any;
  renotify ? : boolean;
  silent ? : boolean;
  sound ? : string;
  noscreen ? : boolean;
  sticky ? : boolean;
  dir ? : 'auto' | 'ltr' | 'rtl';
  lang ? : string;
  vibrate ? : number[];
  timestamp ?: any
}


@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.sass']
})




export class NotificationsDialogComponent implements OnInit {



  userSearch= new FormGroup({
    searchValue: new FormControl()
}); 

onFormSubmit(): void {
 

this.searchInObjects(this.userSearch.get('searchValue').value)

} 

searchInObjects( searchValue:string){
console.log(searchValue)
  if(searchValue!=" " && searchValue !=null ){

  var i =""
  this.searchResult=[]
searchValue=searchValue.toLowerCase()


//console.log(this.allSearchMarker)

  this.allSearchMarker.forEach(element => {
    element.nameForDisplay= this.infoPopUp.createDisplayName(element)

i =element.nameForDisplay+""



i=i.toLowerCase()

  if(i!== null){
    if(i.indexOf(searchValue)>-1){
    this.searchResult.push(element)
  }}
  


});
    
}
    
 

}

allSearchMarker=[]
  positionLog=[]
  MyMarkers=[]
  searchResult=[]
  MyPos={lat:0,lan:0};
  allMarker:marker[]=[]
  radarDist:number=300;
  noteIsAllwoed:boolean;
   dataNotes: Array < any >= [];
   notedStones=[];
  constructor(private Geofencin:Geofencing , private _mainframe: MainFrameComponent , private _DataComponent:DataComponent , private infoPopUp : InfoPopUpComponent, private _notificationService:PushNotificationsService ) { 



  }


  deleteSearch(){
    console.log("search deltet triggert")

    this.searchResult=[]
    console.log(this.searchResult)
  
  }

  ngOnInit() {

  

//get the set distance for geofencing
    this._DataComponent.cast_geofencingIsActivated.subscribe(dist => this.radarDist=dist)

  
    //get my Positions  emited from Geofencing
    var newpos={lat:0,lan:0} 
    this.Geofencin.cast_geofencingBS.subscribe(data=> {
           if(data.coords!==undefined){
                 newpos.lat=data.coords.latitude
                 newpos.lan=data.coords.longitude
              }
    
    //calc new Distance
            if(newpos.lan!==0 && newpos.lat!=0){
                      this.allMarker= this._DataComponent.calcDist(this._DataComponent.storeEveryData)
            }

    //working with all Markers
           this.allMarker.forEach(element => {
                  if(element.nameForDisplay==""){
                        element.nameForDisplay= this.infoPopUp.createDisplayName(element)
                   }
              
       
      //display data in range in myMarkes
                 if (element.distance<this.radarDist && this.MyMarkers.includes(element)===false){
                      this.MyMarkers.push(element)
                    }

              })


      //notify

      this.MyMarkers.forEach(element => {
      
        if(this.notedStones.includes(element)===false && this._DataComponent.notificationIsActivated){
            this._notificationService.genratenote(element.nameForDisplay)
            this.notedStones.push(element)}
            
      });


      

      //console.log(newpos)


    }
    
    
    )
  
    this._DataComponent.cast_allMarkerList.subscribe(data => { 
     // console.log(data)
      this.allSearchMarker=data } )

  
  
  }
 


  showOnMap(item:marker){

 

      var newview:view={lanlat:[item.lan,item.lat],zoom:18}
      this._DataComponent.editSwitchView(newview)
      this.closeNotifications()
    

  
  }


  closeNotifications(){
    this._mainframe.switchNotificationsDisplay()
    this._mainframe.switchSubmenue()
  }

 




btnNote(){
// this._notificationService.genratenote("doubleMeh!!!")
//console.log("")
}




}



