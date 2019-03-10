import { Component, OnInit } from '@angular/core';
import { marker } from 'src/app/controller/marker';
import { HttpControllerService } from 'src/app/controller/http-controller.service';
import { DataControllerService } from 'src/app/controller/data-controller.service';
import { DataComponent } from 'src/app/controller/data/data.component';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { Geoposition } from 'src/app/controller/geoFunctions/geoposition';
import { Geofencing } from 'src/app/controller/geoFunctions/geoFencing';

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


  constructor( private _HttpControllerService :HttpControllerService, private _DataComponent:DataComponent  , private  _MainFrameComponent:MainFrameComponent, private _geoposition:Geoposition , private _geofencing: Geofencing ) {  }
  map;
  geolocationPosition;
  markMyPos:any={lat:49.000,lon:8.000}
  myPos;
  currentLayer;
  clusterLAyer;
  clusterArray:marker[]=[];

 greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  



  ngOnInit() {


    
   
  this.map = L.map('map',{zoomControl: false}).setView([50.0000, 8.27], 18);
  this.map.on('click', e=> this.getNearMarkers(e))
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
 
  this.currentLayer=this.createLayer(this.allMarker,this.greenIcon)
  this.myPos= new L.Marker(this.markMyPos)
  this.map.addLayer(this.myPos)
  this.map.addLayer(this.currentLayer) 
  this._DataComponent.cast_allMarkerList.subscribe(data=>{ 
  this.map.removeLayer(this.currentLayer)
  this.currentLayer=this.createLayer(this.allMarker,this.greenIcon)
  this.map.addLayer(this.currentLayer) 
  this.allreadyDisplayedMarker=data
  this.allreadyDisplayedMarker.forEach(item => { 
      var  n =this.createMarker(item,this.greenIcon).addTo(this.currentLayer)

      }
      
      )
  

    /*console.log(data)

        data.forEach(element => {

          var c=0
            this.allreadyDisplayedMarker.forEach(item => {
              if(item.name ===element.name  ){
                c=1
              }
            });
            
            if(c==0){
              var  n =this.createMarker(element,this.greenIcon).addTo(this.currentLayer)
              this.allreadyDisplayedMarker.push(element)
            }
       


    });
   
  */

   })

 }





/**
 * fires the functions to load new data 
 * triggert in html by dom emit
 */
  getDataInView() {
    //  this.map.removeLayer(this.currentLayer)
    if (this.map.getZoom() > 12) {
      var bounds = this.map.getBounds()
      var boundString: string = bounds._southWest.lat + "," + bounds._southWest.lng + "," + bounds._northEast.lat + "," + bounds._northEast.lng
      this._DataComponent.fetchOsmShit(boundString.toString())

    }
    var width = 2000
    var point = this.map.getCenter()

    this._DataComponent.fetchWikidata(width, point)

  }




  zoomIn(){
    var zoom=this.map.getZoom()
     this.map.setZoom(zoom+1)
   }

   zoomOut(){
    var zoom=this.map.getZoom()
     this.map.setZoom(zoom-1)
   }



   showMyLocation(){
    this.map.setView([this._geoposition.$geolocationPosition.coords.latitude,this._geoposition.$geolocationPosition.coords.longitude],16)
    var lat = (this._geoposition.$geolocationPosition.coords.latitude);
    var lng = (this._geoposition.$geolocationPosition.coords.longitude);
    this.map.removeLayer(this.myPos)
    this.markMyPos=[lat,lng]
    this.myPos= new L.Marker(this.markMyPos)
    this.map.addLayer(this.myPos)
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

   this.switchInfoOn()}
}




}
