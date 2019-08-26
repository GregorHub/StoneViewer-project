import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';

@Component({
  selector: 'app-gallerie',
  templateUrl: './gallerie.component.html',
  styleUrls: ['./gallerie.component.sass']
})
export class GallerieComponent implements OnInit {

  constructor(private _mainframe: MainFrameComponent) { }

  ngOnInit() {
  }

closeGallerie(){
  this._mainframe.switchGallerieIsHidden()
  this._mainframe.switchSubmenue()
  

}

}
