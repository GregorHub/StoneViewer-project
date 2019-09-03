import { Component, OnInit } from '@angular/core';
import { marker } from 'src/app/controller/marker';
import { HttpControllerService } from 'src/app/controller/http-controller.service';
import { DataComponent } from 'src/app/controller/data/data.component';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';
import { view } from 'src/app/controller/Settings/view';


export interface m{
  latlng:string
}
declare let L;
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.sass']
})
export class MapDialogComponent implements OnInit {
  data: any;
  allMarker=[];
allreadyDisplayedMarker=[]
toHigh=""

  constructor( private _HttpControllerService :HttpControllerService, private _DataComponent:DataComponent  , private  _MainFrameComponent:MainFrameComponent, private _geoposition:Geoposition , private Geofencing:Geofencing  ) {  }

  map;
  geolocationPosition;
  markMyPos:any={lat:0.000,lon:0.000}
  myPos;
  currentLayer;
  clusterLAyer;
  circleMarker;
  polyline;
  clusterArray:marker[]=[];
  showLocation:boolean=true;

 greenIcon = new L.Icon({
    //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
    iconUrl:"./assets/marker.png",
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
directionMarker = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
     // iconUrl:"./assets/ori.png",
      //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],

  
})





setSelectedMarkerViewAndPolygon(view:view){



      if(this.markMyPos.lat!=0 && view.relative==true){

        this.map.fitBounds([
          view.lanlat,
           this.markMyPos
       ] ,{padding:[50,50]} );
     
     
      

     //  this.map.setZoom(this.map.getZoom()-4)

      
       var latlngs = [
        view.lanlat,
        this.markMyPos
 
    ];

/**
    if(this.polyline!=null){
      this.map.removeLayer(this.polyline)
    }

   */ //this.polyline = L.polyline(latlngs, {color: 'blue'}).addTo(this.map)


      }else{

     this.map.setView(view.lanlat,view.zoom)
      }
     
     this.map.removeLayer(this.circleMarker)
     this.circleMarker= L.circle([view.lanlat[0],view.lanlat[1]], {radius: 5}).addTo(this.map);



  }



ngOnInit() {




  var view=[50.00321311004287, 8.278057971037926]

if(localStorage.getItem("view")!==null){
  view= JSON.parse( localStorage.getItem("view"))
}

  

  this.map = L.map('map',{zoomControl: false}).setView(view, 18);
  this.map.on('click', e=> this.getNearMarkers(e))
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
 
  this.currentLayer=this.createLayer(this.allMarker,this.greenIcon)
  this.myPos= new L.Marker(this.markMyPos, this.directionMarker,  {rotationAngle: 45})
  this.map.addLayer(this.myPos)
  this.map.addLayer(this.currentLayer) 



  this.circleMarker= L.circle([50, 8], {radius: 2000}).addTo(this.map);

  this._DataComponent.cast_allMarkerList.subscribe(data=>{ 
  this.map.removeLayer(this.currentLayer)


  this.currentLayer=this.createLayer(this.allMarker,this.greenIcon)

  


  this.map.addLayer(this.currentLayer) 
  this.allreadyDisplayedMarker=data

  if( this.allreadyDisplayedMarker[0] != undefined){ 
    
   
  
  }
  this.allreadyDisplayedMarker.forEach(item => { 


if(item.markedForWiMa!=true){

  var  n =this.createMarker(item,this.greenIcon).addTo(this.currentLayer)
}



      //var  n =this.createMarker(item,this.directionMarker).addTo(this.currentLayer)
    

     

      }
      
      )

      
      this.allreadyDisplayedMarker.filter(element => {
        if(element.markedForWiMa==true){
          var n =this.createMarker(element,this.directionMarker).addTo(this.currentLayer)
        }
      } )
    //  console.log( this.allreadyDisplayedMarker[0])
    // if( this.allreadyDisplayedMarker[0] != undefined){   var m= this.createMarker( this.allreadyDisplayedMarker[0],this.directionMarker).addTo(this.currentLayer)}


   

   })

  

   this.Geofencing.cast_geofencingBS.subscribe( data => {  this.showMyLocation(false) ;this._DataComponent.calcDist(this._DataComponent.storeEveryData)   })


  this.getDataInView() 
   this.map.setZoom(14)
   this._DataComponent.cast_switchView.subscribe(view =>{  this.setSelectedMarkerViewAndPolygon(view)   })
  this._DataComponent.cast_selectedMarker.subscribe(data =>  {
    if(data.name=="LocalChoosen"){

        this.map.removeLayer(this.circleMarker)
    }
  })

   this._DataComponent.cast_geopositionIsActivated.subscribe(data=> this.showLocation=data )

}



/**
 * fires the functions to load new data 
 * triggert in html by dom emit
 */

getDataInView() {
    //  this.map.removeLayer(this.currentLayer)
    if (this.map.getZoom() > 12) {
      this.toHigh=""
      var bounds = this.map.getBounds()
      
      var boundString: string = bounds._southWest.lat + "," + bounds._southWest.lng + "," + bounds._northEast.lat + "," + bounds._northEast.lng
      this._DataComponent.fetchOsm(boundString.toString())

      console.log("meh")
   console.log(boundString)
    
      var nE = bounds._northEast
      var sW=bounds._southWest

      var _distance = nE.distanceTo(sW)


    var width = _distance/2
    var point = this.map.getCenter()

    this._DataComponent.fetchWikidata(width, point)
    }else(this.toHigh="in dieser Zoomstufe können keine Daten geladen werden")
 
 //console.log(this.map.getCenter())
localStorage.setItem("view",    JSON.stringify({"lat": this.map.getCenter().lat  ,"lng":this.map.getCenter().lng})    )


  }


deleteData(){
  this._DataComponent.storeEveryData=[]
  this._DataComponent.editAllMarkerList([])
  
  localStorage.setItem("sd", JSON.stringify([]) )


}


  zoomIn(){
    var zoom=this.map.getZoom()
     this.map.setZoom(zoom+1)



   }

   zoomOut(){
    var zoom=this.map.getZoom()
     this.map.setZoom(zoom-1)
   }



   showMyLocation(zommIntomyPos:boolean){


    var customOptions =
    {
    'maxWidth': '500',
    'className' : 'custom'
    }


    if(this._geoposition.MyPosIsBlocked==false && this.showLocation){

     if(this._geoposition.$geolocationPosition!==undefined){
   
    var lat = (this._geoposition.$geolocationPosition.coords.latitude);
    var lng = (this._geoposition.$geolocationPosition.coords.longitude);
    this.map.removeLayer(this.myPos)
    this.markMyPos=[lat,lng]
    this.myPos= new L.Marker(this.markMyPos)
    this.myPos.bindPopup("Mein Standort",customOptions).openPopup()
    this.map.addLayer(this.myPos)

      if(zommIntomyPos){
        this.map.setView([this._geoposition.$geolocationPosition.coords.latitude,this._geoposition.$geolocationPosition.coords.longitude],15)
        this.getDataInView()
      }

   }  else{ 
     //alert("no position available")

   }}else{
     // alert("no position available")
    }


    var icon = L.divIcon({
      iconSize: [31, 27],
      iconAnchor: [13.5, 13.5],
      popupAnchor: [0, -11],
      className: 'rotated-markerdiv'
  })






  }



 createMarker(element:marker,icon){
  var newMarker= 
  L.marker([element.lan,element.lat],{icon:icon})
  //.on('click', e=> this.switchInfoOn(e) )
  return newMarker
  }


createLayer(markerList:marker[],icon){
   //create a layer array with the Lat/lng infomation from the marker object
    var layer=[];
    markerList.forEach(element => {

      
        
  

     var  newMarker=L.marker([element.lan,element.lat],{icon:icon})
     layer.push(newMarker);
    });
    //create layergrou based on the array this can be added to map
   var layerG=L.layerGroup(layer)

    return layerG

   }

   
switchInfoOn(){
     this._MainFrameComponent.switchInfoPopUpIsHidde()
     this._MainFrameComponent.submenueIsHidden=true
   }


getNearMarkers(e){

    var markerListSelected=[]
    var locX=e.latlng.lat
    var locY=e.latlng.lng


    this.allreadyDisplayedMarker.forEach(element => {

     //console.log(element)
     var  dx:number= element.lan - locX 
     var  dy:number = element.lat -locY 

     var sqrtdx= Math.sqrt( dx*dx)
     var sqrtdy=Math.sqrt( dy*dy)
         
     var zoom=this.map.getZoom()
     var zoomlock=0
//console.log(zoom)
      if(zoom==12){
            zoomlock=0.005}
        else if(zoom==13){
          zoomlock=0.0025
        }
        else if(zoom==14){
          zoomlock=0.00125
        }
        else if(zoom==15){
          zoomlock=0.0015625
        }
        else if(zoom==16){
          zoomlock=0.00075
        }else if(zoom>16){
          zoomlock=0.00035
        }

      if ( sqrtdx< zoomlock && sqrtdy < zoomlock ){
        markerListSelected.push(element)
      }
    });

   // console.log(markerListSelected)
   
    this._DataComponent.editSelectedMarkerlist(markerListSelected)

    if(markerListSelected.length!=0){

      console.log(markerListSelected)
   this.switchInfoOn()}
}






}
