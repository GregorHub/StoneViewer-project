import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaServiceService {
  askUserToUpdate=true;
  promptEvent: Event;
  constructor(private swUpdate: SwUpdate) {

    this.swUpdate.available.subscribe(event => {
      if (this.askUserToUpdate) {
        window.location.reload();

      }
    });

 


  }



}
