import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import { Observable } from 'rxjs'; //Observable from rxjs library
import { Http, Response, RequestOptions,Headers } from '@angular/http'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { longStackSupport } from 'q';
import { last } from 'rxjs-compat/operator/last';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpControllerService  {
 
  constructor( private http:Http) {

    /*
    this.http.get('/assets/localData.json').subscribe(data => {
    console.log(data.text());
  })*/


  this.write2Json('{"id":1}')
   }


write2Json(text:string){
 /*

  this.http.post("/src/assets/localData.json",
  {
      "courseListIcon": "...",
      "description": "TEST",
      "iconUrl": "..",
      "longDescription": "...",
      "url": "new-url"
  
    })
  .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");


        });

*/
      }

  getOsmData(url):Observable<any>{
    return this.http.get(url)
    .map((response:Response)=>{const result = response.json();  return result; })
    .catch((error : Response | any) => {  return Observable.throw(error.statusText);    
      });
  }




getWikiData(url):Observable<any>{
  return this.http.get(url)
  .map((response:Response)=>{const result = response.json().results.bindings
   // console.log(result)
    return result; })
  .catch((error : Response | any) => {  return Observable.throw(error.statusText);    
   });
}

















 }
