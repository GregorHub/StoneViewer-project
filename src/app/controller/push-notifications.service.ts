import {
  Injectable
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class PushNotificationsService {
      update= new BehaviorSubject<string>("newUpdate")
    cast_update=this.update.asObservable()
    editUpdate(newUpdate){
    this.update.next(newUpdate)
    }

  constructor() { 
   
   // Notification.requestPermission(function(result)  {})

  
  }


    genratenote(text){
 
      
      navigator.serviceWorker.register('ngsw-worker.js');
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('StoneViewer',{body: text ,silent:false  });
          });
        }
      });

    }
    



  
}


