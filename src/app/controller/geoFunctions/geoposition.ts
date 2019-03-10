export class Geoposition {

    /**
     * Getter $geolocationPosition
     * @return {Position}
     */
	public get $geolocationPosition(): Position {
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

    constructor(){
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
              
                this.geolocationPosition = position,
                    console.log(position)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };

}}
