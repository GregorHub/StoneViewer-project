import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DataComponent } from 'src/app/controller/data/data.component';
import { marker } from 'src/app/controller/marker';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-info-pop-up',
  templateUrl: './info-pop-up.component.html',
  styleUrls: ['./info-pop-up.component.sass']
})
export class InfoPopUpComponent implements OnInit {
  expandetInfoIsHidden=true;
 expandetInfoMarker:marker;
  description: string="";
  constructor(private  _MainFrameComponent:MainFrameComponent, private _MapDialogComponent:MapDialogComponent ,private _DataComponent:DataComponent) { }
localSelectedMarker=[];
  ngOnInit() {
    this._DataComponent.selectedMarkerList.subscribe( data=>{
      
      
      this.localSelectedMarker=data
    
     // console.log(data)
      this.expandetInfoMarker=data[0]


    this.localSelectedMarker.forEach(element => {
     
    element.nameForDisplay= this.createDisplayName(element)

    });

    this.localSelectedMarker.sort(function (a,b){ return a.distance - b.distance})

    } )




  }




createDisplayName(marker:marker){
  var name:string;
  console.log(marker)
  var obj:any=marker

  if(obj.osmMeta.name!= undefined){
    console.log(obj.osmMeta.name)
    name=obj.osmMeta.name
  }else if( obj.osmMeta.inscription!=undefined  ){
    console.log(obj.osmMeta.inscription)
    name=obj.osmMeta.inscription
  }else if(obj.wikiDataMeta.itemLabel!=undefined){
    console.log(obj.wikiDataMeta.itemLabel.value)
    name=obj.wikiDataMeta.itemLabel.value
  }else{
    name="unbekannt"
  }


  return name

  

//console.log(marker.nameForDisplay)




}  


switchexpandetInfoIsHidden(){

if(this.expandetInfoIsHidden==true){
  this.expandetInfoIsHidden=false;
}else{
  this.expandetInfoIsHidden=true;
}
}

selectExtendetInfo(item){
  this. expandetInfoMarker=item




if(item.osmMeta.inscription!=={}){
  this.description=item.osmMeta.inscription
}


}

  closeInfo(){
   if(!this.expandetInfoIsHidden){ this.switchexpandetInfoIsHidden()}
    this._MainFrameComponent.switchInfoPopUpIsHidde()

  }

}
