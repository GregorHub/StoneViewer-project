import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SettingsDialogComponent } from '../settings-dialog.component';

@Component({
  providers:[SettingsDialogComponent],
  selector: 'app-settings-check-box',
  templateUrl: './settings-check-box.component.html',
  styleUrls: ['./settings-check-box.component.sass']
})
export class SettingsCheckBoxComponent implements OnInit {
  @Input() checkBoxName:string 
  @Input() checkBoxState:boolean;
  @Output() valueChange = new EventEmitter();
  
  constructor() { }

  ngOnInit() {

  }

  commitChange(){
    this.checkBoxState=!this.checkBoxState
     this.valueChange.emit(this.checkBoxState)
  }

}
