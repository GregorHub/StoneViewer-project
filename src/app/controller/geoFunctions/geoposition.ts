import { BehaviorSubject } from "rxjs";

export class Geoposition {



    MyPos=new BehaviorSubject <any>(this.$geolocationPosition)
    cast_MyPos=this.MyPos.asObservable()


MyPosIsBlocked:boolean=false;


    /**
     * Getter $geolocationPosition
     * @return {Position}
     */
	public get $geolocationPosition(): Position {
        this.fetchPositon()
		return this.geolocationPosition;
	}

    /**
     * Setter $geolocationPosition
     * @param {Position} value
     */
	public set $geolocationPosition(value: Position) {
		this.geolocationPosition = value;
	}
    private geolocationPosition

    constructor(  ){


        this.fetchPositon()

     

}



private askedOnce=false;

fetchPositon(){
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.MyPosIsBlocked=false;
                this.geolocationPosition = position
            
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        this.MyPosIsBlocked=true;
                        if(this.askedOnce==false){
                        if (confirm('Permission Denied to use Geolocation!')) {
                            this.askedOnce=true
                        } else {
                            // Do nothing!
                        }}

                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }

                this.geolocationPosition=undefined
            } ,
            {  enableHighAccuracy: true }
        );
    };
}
}

