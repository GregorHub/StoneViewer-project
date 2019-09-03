import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';
import { DataComponent } from 'src/app/controller/data/data.component';
import { marker } from 'src/app/controller/marker';
import { view } from 'src/app/controller/Settings/view';
import { InfoPopUpComponent } from '../info-pop-up/info-pop-up.component';

@Component({
  selector: 'app-gallerie',
  templateUrl: './gallerie.component.html',
  styleUrls: ['./gallerie.component.sass']
})
export class GallerieComponent implements OnInit {

  localMarker=[]
  selctedCompare=[]
  wiMaCounter=0
  WiMaChallngeComplete=false
  challangeDisc=false

  constructor(private _mainframe: MainFrameComponent , private _dataComponent:DataComponent, private _infoPopUp: InfoPopUpComponent ) {


    this._dataComponent.cast_allMarkerList.subscribe(
      data => {this.localMarker=data
      
      this.localMarker.filter(e => { if( e.markedForWiMa==true){
        
        
        if( this.selctedCompare.includes(e.name.toString())==false ){
        this.selctedCompare.push(e.name.toString()) }
      
      


      }   
    })
  
  //  console.log(this.selctedCompare.length)
    if(this.selctedCompare.length==6){
      this.WiMaChallngeComplete=true
     // localStorage.setItem("WimaChallange","true")
     // this._mainframe.dialogBoxIsHidden=false
    }else(this.WiMaChallngeComplete=false)
  
    }

      )
  
   }

  ngOnInit() {
  }

closeGallerie(){
  this._mainframe.switchGallerieIsHidden()
  this._mainframe.switchSubmenue()
  

}


showOnMap(item:marker){
   
 

  var newview:view={lanlat:[item.lan,item.lat],zoom:18,relative:false}
  this._dataComponent.editSwitchView(newview)


  this._dataComponent.editSelectedMarker(item)

  this.closeGallerie()



}


switchChallangeDesciption(){

  if(   this.challangeDisc==false){
    this.challangeDisc=true
  }else{
    this.challangeDisc=false
  }

}


deleteMarkedStones(){


  if (confirm('Das Löschen der Markierung kann nicht rückgänig gemahct werden! Wollen Sie die Wirklich entfernen?')) {

    this._dataComponent.allMarkerList.value.filter(e => e.markedForWiMa=false)
    this.WiMaChallngeComplete=false
    this.selctedCompare=[]
  
} else {
    // Do nothing!
}


}

}
