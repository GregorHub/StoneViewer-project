import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaServiceService {
  askUserToUpdate=true;
  promptEvent: Event;
  constructor(private swUpdate: SwUpdate) {


  //console.log(this.swUpdate.checkForUpdate())


    this.swUpdate.available.subscribe(event => {
      
    // console.log(event)
      
      
      if (this.askUserToUpdate) {
        window.location.reload();

      }
    });

 


  }



}
