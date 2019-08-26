import { Component } from '@angular/core';
import { HttpControllerService } from '../http-controller.service';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { marker } from '../marker';
import { hasOwnProperty, longStackSupport } from 'q';
import { Geoposition } from '../geoFunctions/geoposition';
import { view } from '../Settings/view';
import { isNgTemplate } from '@angular/compiler';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { JsonPipe } from '@angular/common';


declare let L;
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent  {
  //    49.9066     8.12649
 
  oldBounds;


testStadeckn:marker[]=[

  { lat:8.126496,
    lan:49.906687,
    name:"testdaten",
  nameForDisplay:"testdaten",
  osmMeta:{},
  wikiDataMeta:{},
  type:"OSM",
  distance:0
   },
   { lat:8.126353,
    lan:49.907111,
    name:"testdaten",
  nameForDisplay:"testdaten",
  osmMeta:{},
  wikiDataMeta:{},
  type:"OSM",
  distance:0
   }
]


//allFetchedData:marker[]=this.testStadeckn
allFetchedData:marker[]=[]


constructor(private _HttpControllerService : HttpControllerService, private _geoposition: Geoposition  ) { 


 if (localStorage.getItem("sd")===null){
  localStorage.setItem("sd", JSON.stringify(this.storeEveryData) )
 }

  var loacStorageStoredData = JSON.parse( localStorage.getItem("sd"))



 this.storeEveryData=loacStorageStoredData

 if( localStorage.getItem("geolocation")===null ) {

  localStorage.setItem("geolocation","true")

}

if( localStorage.getItem("geofencingRadar")===null ) {

  localStorage.setItem("geofenfingRadar","100")}

}







/**
 * triggert by the reciver functuion
 * filters if points hav the same name
 * filter if the points are in the same place
 * adds them to allMarkerList
 * Q62763570
 * http://www.wikidata.org/entity/
 */

storeEveryData:marker[]=this.testStadeckn






checkSameComponents(item:marker,element:marker){
 var tv:boolean=false



  if(item.lan==element.lan){
    tv=true
  }
  
  if(item.lat==element.lat && item.lan==element.lan ){
    tv=true
  }

  
 if(element.osmMeta.wikidata !== undefined){ 
 //console.log(item)
 var itemNameString:string =""+item.name
     itemNameString=itemNameString.slice(31)
 
var wikidataId: string= element.osmMeta.wikidata
    
//console.log("a: " +itemNameString + "b: " + wikidataId)

    if(itemNameString===wikidataId){
  //   console.log( item.name)    
      tv=true
      }
 }



  return tv
}






reciveNewData(markerList:marker[]){

  //console.log(this._geoposition.$geolocationPosition )

  markerList.forEach(element => {

    var counter=0
       this.storeEveryData.forEach(item => {
          if(item.name===element.name  ){
            counter=counter+1
          }
       });
       if(counter==0){
          this.storeEveryData.push(element)

       }
  });
  
var merge=[]
var single=[]
   this.storeEveryData.forEach(element => {
    var isDOuble=false;
    var doublicates=[]


    
    //console.log(wid)
    //check if this element is double
        this.storeEveryData.forEach(item=>{
   
           if(this.checkSameComponents(item,element) && element.name!==item.name  ){
             isDOuble=true
             doublicates.push(item)
           
           }

          })

        //check if element is already merged

        if(isDOuble != false  ){
     
          var isMerged=false
          merge.forEach(merge_item => {

            if(merge_item.lan==element.lan  ){
              isMerged==true
            //  console.log("ismerged")
            }  


            

          });

          if(isMerged==false){
           //write merge
           
         var  newMergeItem:marker={
           name:element.name,
           lat:element.lat,
           lan:element.lan,
           type:element.type,
           wikiDataMeta:element.wikiDataMeta,
           osmMeta:element.osmMeta,
           nameForDisplay:"" ,
           distance:0

          }
          merge.push(newMergeItem)
        }

        }else if(isDOuble==false){
           single.push(element)
        }

     });

 merge.sort(function (a,b){ return a.lan - b.lan})

//console.log(merge)
  for(var i =0 ;i<merge.length-1;i++){

      if(merge[i].lan==merge[i+1].lan ){
        var  newSingle:marker={
          name:merge[i].name,
          lat:merge[i].lat,
          lan:merge[i].lan,
          type:"WikiandOsm",
          wikiDataMeta:merge[i].wikiDataMeta,
          osmMeta:merge[i].osmMeta,
          nameForDisplay:"" ,
          distance:0
         }

         if(merge[i+1].type=="Wiki"){
            newSingle.wikiDataMeta=merge[i+1].wikiDataMeta
         }else if(merge[i+1].type=="OSM"){
          newSingle.osmMeta=merge[i+1].osmMeta
         }
        single.push(newSingle)
      }
  }


 this.storeEveryData=single
 //console.log(this.storeEveryData)

this.storeEveryData=this.calcDist(this.storeEveryData)


 this.editAllMarkerList(this.storeEveryData)

 localStorage.setItem("sd", JSON.stringify(this.storeEveryData) )


}








calcDist(markerList:marker[]){
  var geopositionIsAllowed:boolean;
  this.cast_geopositionIsActivated.subscribe(data=>geopositionIsAllowed=data)
  if(this._geoposition.$geolocationPosition!==undefined && geopositionIsAllowed ){
   // console.log(geopositionIsAllowed)
  var A=L.latLng(this._geoposition.$geolocationPosition.coords.longitude ,this._geoposition.$geolocationPosition.coords.latitude);


  markerList.forEach(element => {

    

    var B={latlng:{lat:element.lat,lng:element.lan}}
  

    var _distance = A.distanceTo(B.latlng)


    element.distance= Math.round(_distance)

    if(element.distance<600){
      ///console.log(element)
    }
  });
  

  }
  return markerList
}

/**
 * =========================================================================================================
 * Observables
 */
allMarkerList= new BehaviorSubject <marker[]>([])
cast_allMarkerList=this.allMarkerList.asObservable();
editAllMarkerList(newAllMarkerList){



this.allMarkerList.next(newAllMarkerList)
}


selectedMarkerList=new BehaviorSubject <marker[]>([])
cast_selectedMarkerList=this.selectedMarkerList.asObservable()
editSelectedMarkerlist(newSelectedMarkerList){
  this.selectedMarkerList.next(newSelectedMarkerList)
}


switchView=new BehaviorSubject <view>({lanlat:[0,0],zoom:1})
cast_switchView=this.switchView.asObservable()
editSwitchView(newView:view){
    this.switchView.next(newView)
}


selectedMarkerforObservation=new BehaviorSubject <marker>(  { lat:0,    lan:0,    name:"test",  nameForDisplay:"",  osmMeta:{},  wikiDataMeta:{},  type:"",  distance:-1   },)
cast_selectedMarkerforObservation=this.selectedMarkerforObservation.asObservable()
editSelectedMarkerforObservation(newMarker){

  this.selectedMarkerforObservation.next(newMarker)
  
}

selectedMarker=new BehaviorSubject <marker>(  { lat:0,    lan:0,    name:"LocalChoosen",  nameForDisplay:"",  osmMeta:{},  wikiDataMeta:{},  type:"",  distance:-1  },)
cast_selectedMarker=this.selectedMarker.asObservable()
editSelectedMarker(newMarker){

  this.selectedMarker.next(newMarker)
  
}




/**
 * =========================================================================================================
 * Settings Observables
 */


geofencingRadarDist= new BehaviorSubject <number>(JSON.parse(localStorage.getItem('geofencingRadar')))
cast_geofencingIsActivated= this.geofencingRadarDist.asObservable()
editGeofencingIsActivated(newDist){

  this.geofencingRadarDist.next(newDist)
  localStorage.setItem('geofencingRadar', String(newDist))
}

geopositionIsActivated= new BehaviorSubject <boolean>(JSON.parse(localStorage.getItem("geolocation")) )
cast_geopositionIsActivated= this.geopositionIsActivated.asObservable()

editGeopositionIsActivated(newState){
  console.log(newState)
  this.geopositionIsActivated.next(newState)
  localStorage.setItem('geolocation', String(newState))
}

notificationIsActivated= new BehaviorSubject <boolean>(  JSON.parse(localStorage.getItem("notification"))   )
cast_notificationnIsActivated= this.notificationIsActivated.asObservable()
editNotificationIsActivated(newState){
this.notificationIsActivated.next(newState)
localStorage.setItem('notification', String(newState))
}



//===========================================================================================================

fetchOsm(bounds){

    //this.optimzeOSMbounds(bounds)
    this._HttpControllerService.getOsmData(this.createOSMquery(bounds)).subscribe(data => {   
     var newMarkerList:marker[]=[]
     data.elements.forEach(element => {
     

     var newMarker:marker={name:element.id,lan:element.lat,lat:element.lon,type:"OSM",wikiDataMeta:{},osmMeta:element.tags  , nameForDisplay:"",   distance:0 }
     newMarkerList.push(newMarker)
      });

        // var myJSON = JSON.stringify(data);
       //this.dataOSMLoc=myJSON
      //  this.testjsonOSM=data
     //  console.log(this.testjsonOSM.elements)
     //  console.log(newMarkerList)
     
     
     // this.editMarkerList(newMarkerList)

     this.reciveNewData(newMarkerList)


       } )

       this.oldBounds=bounds;
  	 // return this.testjsonOSM
 
  }


createOSMquery(bounds){
    var url:string;
    var overpassQuery:string = 'memorial:type'
    var overpassQueryVal:string ='stolperstein'
                     
    var nodeQuery = 'node[' + (overpassQueryVal==""?overpassQuery:"'"+overpassQuery+"'='"+overpassQueryVal+"'") + '](' + bounds + ');';
    var wayQuery = 'way[' + (overpassQueryVal==""?overpassQuery:"'"+overpassQuery+"'='"+overpassQueryVal+"'") + '](' + bounds + ');';
    var relationQuery = 'relation[' + (overpassQueryVal==""?overpassQuery:"'"+overpassQuery+"'='"+overpassQueryVal+"'") + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + nodeQuery + wayQuery + relationQuery + ');out%20geom;';
    var baseUrl = 'https://overpass-api.de/api/interpreter';
    var url = baseUrl + query;
   
    return url

  }

fetchWikidata(width,point){

  
  this._HttpControllerService.getWikiData(this.createWikidataQuerry(width,point))
  .subscribe(data => {
     var sortedItems=[]
     var newMarkerList:marker[]=[]
    data.forEach(element => {
  var c=0
       sortedItems.forEach(iem => {
      if (iem.item.value ==element.item.value ){
        c+=1;
      }   
       });
       
       if(c==0){
        sortedItems.push(element)}
        
    });
    

    var newMarkerList:marker[]=[]
     sortedItems.forEach(element => {



//poin as string is the item value given by wikidata --> has to be changed to get the right result
     var  pointAsString = element.location.value.replace( ")","")
     pointAsString=pointAsString.replace("Point(","")
    pointAsString=pointAsString.split(" ")

     var lat:number=parseFloat( pointAsString[0])

     var lng:number= parseFloat(pointAsString[1])

     var newMarker:marker={name:element.item.value,lat:lat,lan:lng,type:"Wiki",wikiDataMeta:element,osmMeta:{},  nameForDisplay:"",   distance:0 }
          

     newMarkerList.push(newMarker)
      });
    
  //    console.log(newMarkerList)
    
  
  this.reciveNewData(newMarkerList)
  //!  this.editMarkerList(newMarkerList)

})

}

createWikidataQuerry(width,coord){

var query = [ "PREFIX bd: <http://www.bigdata.com/rdf#>\n",
 "PREFIX wikibase: <http://wikiba.se/ontology#>\n",
 "PREFIX wdt: <http://www.wikidata.org/prop/direct/>\n",
 "PREFIX wd: <http://www.wikidata.org/entity/>\n",
 "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n",
 "SELECT ?item ?itemLabel ?location ?rel ?relLabel ?val ?valLabel ?pic ?monument   WHERE\n",
 "{\n",
  " ?item wdt:P31 wd:Q26703203 . \n",
  "?item wdt:P18 ?pic .",
  "?item wdt:P1684 ?monument .",
 "SERVICE wikibase:around { 	\n",
  " ?item wdt:P625  ?location .\n",
   "bd:serviceParam wikibase:center \"Point("+coord.lng+" "+coord.lat+")\"^^geo:wktLiteral. \n",
  " bd:serviceParam wikibase:radius \""+width/1000+"\".\n",
 "}\n",
      "?item ?rell ?val .\n",
      " ?rel wikibase:directClaim ?rell .\n",
 	"SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\" }\n",
" }\n",
 "ORDER BY ?itemLabel\n",
    ].join(" ");

  var queryUrl = "https://query.wikidata.org/sparql?query="+ encodeURIComponent(query) +"&format=json";
  return queryUrl
}





optimzeOSMbounds(bounds){
  var oldBoundArray=[]
  if(this.oldBounds!=undefined){
  oldBoundArray= this.oldBounds.split(",")}
  var BoundArray=bounds.split(",")

  var XQ1=parseFloat(oldBoundArray[0])
  var YQ1=parseFloat(oldBoundArray[1])
  var XP1=parseFloat(oldBoundArray[2])
  var YP1=parseFloat(oldBoundArray[3])

var XQ2=parseFloat(BoundArray[0])
var YQ2=parseFloat(BoundArray[1])
var XP2=parseFloat(BoundArray[2])
var YP2=parseFloat(BoundArray[3])

//console.log("triggert")
 if( XQ1<XQ2 && XQ2<XP1 && YQ1<YQ2 && YQ2<YP1   ){

  console.log("fall 1")

 }else if(XQ1<XP2 && XP2<XP1 && YQ1<YP2 && YP2<YP1  ){
  console.log("fall 2")
 }


}







}
function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}



