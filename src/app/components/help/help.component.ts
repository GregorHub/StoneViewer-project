import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass']
})
export class HelpComponent implements OnInit {

  iconFolder=false
  menuFolder=false
  settingsFolder=false
  bedienungFolder=false
  stoneFolder=false
  constructor( private _mainframe: MainFrameComponent) { }

  ngOnInit() {
  }


  closeHelp(){
this._mainframe.switchHelpIsHidden()
this._mainframe.switchSubmenue()

  }


  switchIconFolder(){

    if(this.iconFolder==true){
      this.iconFolder=false;
    }else{
      this.iconFolder=true;
    }
    }
  
    switchMenuFolder(){
      if(this.menuFolder==true){
        this.menuFolder=false;
      }else{
        this.menuFolder=true;
      }

    }

    switchSettingsFolder(){
      if(this.settingsFolder==true){
        this.settingsFolder=false;
      }else{
        this.settingsFolder=true;
      }
    }

    switchBedinungsFolder(){
      if(this.bedienungFolder==true){
        this.bedienungFolder=false;
      }else{
        this.bedienungFolder=true;
      }
    }

    switchStoneFolder(){

      if(this.stoneFolder==true){
        this.stoneFolder=false;
      }else{
        this.stoneFolder=true;
      }
    }

  }
