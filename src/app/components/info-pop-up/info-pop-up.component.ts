import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DataComponent } from 'src/app/controller/data/data.component';
import { marker } from 'src/app/controller/marker';
import { view } from 'src/app/controller/Settings/view';
import { DomSanitizer } from '@angular/platform-browser';
import { GallerieComponent } from '../gallerie/gallerie.component';
import { worker } from 'cluster';

@Component({
  selector: 'app-info-pop-up',
  templateUrl: './info-pop-up.component.html',
  styleUrls: ['./info-pop-up.component.sass']
})
export class InfoPopUpComponent implements OnInit {
  expandetInfoIsHidden=true;
  picIsBig=false;
 expandetInfoMarker:marker;
  description: string="";
  DsiplaySum=true;
  expandPictureSrc="";
  saveUrlImg={};
  wikiInsc=""
  osmInsc=""
  error=false

  WimaListe=[
    "Clementine Strauß geb. Gernsheimer", // Clementine Strauss 
    "http://www.wikidata.org/entity/Q62761011","Stolperstein dedicated to Thekla Hölzer","2985843339",// Thekla Hölzer      
    "6588723742","Berta Bamberger" ,                             // Berta Bamberger
    "http://www.wikidata.org/entity/Q60197130","Stolperstein dedicated to Anna Oppenheimer", "2985830695", // Anna Oppenheimer
    "2985838958" , "Fanny Liesel Silber",//Fanny
    "2985818726","Eduard Hirsch"  //Eduart Hirsch
  ]

  errorText: string;
  wimaCounter: number;
  wimaChallangeComplete=false;

  constructor(private  _MainFrameComponent:MainFrameComponent, private _MapDialogComponent:MapDialogComponent,private _DataComponent:DataComponent ,private _DomSanitizationService: DomSanitizer ) { }
localSelectedMarker=[];
editedDistance=[]
  ngOnInit() {



    if(localStorage.getItem("wimaChallangeComplete")!=undefined){
      this.wimaChallangeComplete=JSON.parse(localStorage.getItem("wimaChallangeComplete"))
    }else{
    localStorage.setItem("wimaChallangeComplete","false")
    }


    this._DataComponent.selectedMarkerList.subscribe( data=>{
      
     
      
      this.localSelectedMarker=data
      this.editedDistance=[]
      this.localSelectedMarker.forEach(element => {
        
        var numberString
        
        if(element.distance>1000){
          var x=element.distance/1000
          numberString =  Math.round(x).toString()+" km";
          numberString= numberString.split(",")
        }else{
        
          numberString= element.distance.toString()+" m"
        }

        this.editedDistance.push(numberString )




      });

     // console.log(data)
      this.expandetInfoMarker=data[0]

      

    this.localSelectedMarker.forEach(element => {
     
    element.nameForDisplay= this.createDisplayName(element)

    });

    this.localSelectedMarker.sort(function (a,b){ return a.distance - b.distance})

    var sum:number=0;
    this.localSelectedMarker.forEach(element => {
          sum = sum+  parseFloat( element.distance)
    });

   
      if(sum<1){
        this.DsiplaySum=false;
      }else{
        this.DsiplaySum=true;
      }
    


    } )

this._DataComponent.cast_allMarkerList.subscribe( data => {
    this.wimaCounter=0
  data.forEach(element => {
      if(element.markedForWiMa==true){
        this.wimaCounter++;
      }
  });

  console.log("WIMACOUNT:" + this.wimaCounter)

} )


  }


  showOnMap(relative:boolean){
    var newview:view={lanlat:[this.expandetInfoMarker.lan,this.expandetInfoMarker.lat],zoom:18,relative:relative}
    this._DataComponent.editSwitchView(newview)
this._DataComponent.editSelectedMarker(this.expandetInfoMarker)
    this.closeInfo()
  }

createDisplayName(marker:marker){
  var name:string;
  //console.log(marker)
  var obj:any=marker

  if(obj.osmMeta.name!= undefined){
   // console.log(obj.osmMeta.name)
    name=obj.osmMeta.name
  }else if( obj.osmMeta.inscription!=undefined  ){
  //  console.log(obj.osmMeta.inscription)
    name=obj.osmMeta.inscription
  }else if(obj.wikiDataMeta.itemLabel!=undefined){
   // console.log(obj.wikiDataMeta.itemLabel.value)
    name=obj.wikiDataMeta.itemLabel.value
  }else{
    name="unbekannt"
  }


  return name

//console.log(marker.nameForDisplay)

}  


switchexpandetInfoIsHidden(){
  this.picIsBig=false
if(this.expandetInfoIsHidden==true){
  this.expandetInfoIsHidden=false;
}else{
  this.expandetInfoIsHidden=true;
}
}

selectExtendetInfo(item){
 // console.log("selectIstriggert")
  this. expandetInfoMarker=item
  this.saveUrlImg={}
  this.expandPictureSrc="" 
  this.safePic()

if(item.osmMeta.inscription!=={}){
  this.description=item.osmMeta.inscription
}


// console.log("item meta data")
if(item.wikiDataMeta.monument!=undefined){
  this.wikiInsc=item.wikiDataMeta.monument.value
}else(this.wikiInsc="")


if( item.wikiDataMeta.pic!=undefined &&  item.wikiDataMeta.pic.value!=={}){


this.expandPictureSrc=  item.wikiDataMeta.pic.value
this.expandPictureSrc= this.expandPictureSrc.replace("http","https")

this.saveUrlImg=this._DomSanitizationService.bypassSecurityTrustUrl(this.expandPictureSrc)


}





  setTimeout(() =>{ 
    if(item.wikiDataMeta.pic!=undefined){
    this.expandPictureSrc=  item.wikiDataMeta.pic.value}
    this.expandPictureSrc= this.expandPictureSrc.replace("http","https")
    this.saveUrlImg=this._DomSanitizationService.bypassSecurityTrustUrl(this.expandPictureSrc)
    this.safePic()  
  // console.log("refresh!!!")
  }, 500);



}


markAsWiMaStein(){
    
//case wether this stone is in list or  not
if( this.isWimaStone(this.expandetInfoMarker) ){
  this.error=false
//maybe calc dist ???
//case for distanze
this.wimaCounter=0
this._DataComponent.storeEveryData.forEach(element => {
    if(element.markedForWiMa==true){
      this.wimaCounter++;
    }
});


  if(this.expandetInfoMarker.distance<100  ){
    this.expandetInfoMarker.markedForWiMa=true 
    if(  this.wimaCounter==5 && this.wimaChallangeComplete==false   ){
      
    console.log("ACTIVE")
      localStorage.setItem("wimaChallangeComplete","true")
      this._MainFrameComponent.switchdialogBoxIsHidden()
      this._MainFrameComponent.switchInfoPopUpIsHidde()
      this.wimaChallangeComplete=true  
    }

  }else{
    (async () => { 
      this.error=true
      this.errorText=" Sie sind zu weit von diesem Stolperstein entfernt um ihn zu markieren!"
      await delay(3000);
    
      // Do something after
      this.error=false
    })();
  }

}else{
 

 (async () => { 
  this.error=true
  this.errorText="Dieser Stein gehört nicht zur WiMa Aufgabe!"
  await delay(3000);

  // Do something after
  this.error=false
})();

}

//this._DataComponent.editAllMarkerList(this._DataComponent.storeEveryData)

}

isWimaStone(element){
var tv:boolean=false

if( this.WimaListe.includes(element.nameForDisplay)  || this.WimaListe.includes(  element.name.toString())   ){
  tv=true
}else(
  tv=false
)



console.log(element)



  return tv
}



safePic(){




  return this.saveUrlImg
}

  closeInfo(){
   if(!this.expandetInfoIsHidden){ this.switchexpandetInfoIsHidden()}
    this._MainFrameComponent.switchInfoPopUpIsHidde()
    this.picIsBig=false
  }


 switchPicIsBig(){
  if(this.picIsBig==true){
    this.picIsBig=false;
  }else{
    this.picIsBig=true;
  }
 }
  

}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}