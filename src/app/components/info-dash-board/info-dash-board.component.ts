import { Component, OnInit } from '@angular/core';
import { DataComponent } from 'src/app/controller/data/data.component';
import { marker } from 'src/app/controller/marker';
import { view } from 'src/app/controller/Settings/view';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';

@Component({
  selector: 'app-info-dash-board',
  templateUrl: './info-dash-board.component.html',
  styleUrls: ['./info-dash-board.component.sass']
})
export class InfoDashBoardComponent implements OnInit {

  markerName=""
  markerDist=""
  localSelectedMarker;
  localChosenMarker;
  selcted=true
  constructor( private _dataComponent : DataComponent, private _geofencing:Geofencing  ) { }

  ngOnInit() {
    this._geofencing.cast_geofencingBS.subscribe( () =>{
    this._dataComponent.cast_allMarkerList.subscribe(data => {  
      data=data.sort(function (a,b){ return a.distance - b.distance})
   
      if(data!=undefined && data.length>0 ){
          this._dataComponent.editSelectedMarkerforObservation(data[0])

      }
    } 
    
    )

    this._dataComponent.cast_selectedMarkerforObservation.subscribe( data=>
      
    {

      this.markerName=data.name
      this.localSelectedMarker=data
      this.markerDist= data.distance.toString()


    }  
    )
  })


this._dataComponent.cast_selectedMarker.subscribe(data=> {

  this.localChosenMarker=data
  //console.log(data)
  if(data.name=="LocalChoosen"){
  this.selcted=true
}else(
  this.selcted=false
)
})


  }


setView(){
  var item=this.localSelectedMarker
  var newview:view={lanlat:[item.lan,item.lat],zoom:18}
  this._dataComponent.editSwitchView(newview)
}

setSelctedView(){
  var item=this.localChosenMarker
  var newview:view={lanlat:[item.lan,item.lat],zoom:18}
  this._dataComponent.editSwitchView(newview)
}

closeSelcted(){
  this.selcted=false

  var newMArker:marker=  { lat:0,    lan:0,    name:"LocalChoosen",  nameForDisplay:"",  osmMeta:{},  wikiDataMeta:{},  type:"",  distance:20   }

 this._dataComponent.editSelectedMarker(newMArker)

}

}
