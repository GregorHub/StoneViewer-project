import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';

@Component({
  selector: 'app-mapsettings',
  templateUrl: './mapsettings.component.html',
  styleUrls: ['./mapsettings.component.sass']
})
export class MapsettingsComponent implements OnInit {

  constructor(private _mainframe: MainFrameComponent) { }

  ngOnInit() {
  }


closeMapsettings(){
  this._mainframe.switchMapsettingsIsHidden()
  this._mainframe.switchSubmenue()
}

}
