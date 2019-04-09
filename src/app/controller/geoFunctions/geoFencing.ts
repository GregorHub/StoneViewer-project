
import { BehaviorSubject } from "rxjs";




export class Geofencing{

    
geofencingBS=new BehaviorSubject <any>([])
cast_geofencingBS=this.geofencingBS.asObservable()

editSelectedMarkerlist(newSelectedMarkerList){
  this.geofencingBS.next(newSelectedMarkerList)

}

ab:Position
    constructor(){

            id = navigator.geolocation.watchPosition(success => {this.ab= success , this.editSelectedMarkerlist(this.ab) } , error, options);


        }

    }






    var id, target, options;

    function success(pos) {
      var crd = pos.coords;
    
      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
   
        navigator.geolocation.clearWatch(id);
      }
    }
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    
    target = {
      latitude : 0,
      longitude: 0
    };
    
    options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };