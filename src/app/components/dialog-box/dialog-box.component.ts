import { Component, OnInit } from '@angular/core';
import { MainFrameComponent } from '../main-frame/main-frame.component';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.sass']
})
export class DialogBoxComponent implements OnInit {

  constructor(private  _MainFrameComponent:MainFrameComponent) { }

  ngOnInit() {
  }



  closeDialogBox(){
    this._MainFrameComponent.dialogBoxIsHidden=true
  }

}
