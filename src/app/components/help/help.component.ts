import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass']
})
export class HelpComponent implements OnInit {

  constructor( private _mainframe: MainFrameComponent) { }

  ngOnInit() {
  }


  closeHelp(){
this._mainframe.switchHelpIsHidden()
this._mainframe.switchSubmenue()

  }

}
