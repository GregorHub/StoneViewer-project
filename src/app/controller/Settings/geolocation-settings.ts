

export class GeolocationSettings {

constructor(){}

    /**
     * Getter $geolocation
     * @return {boolean}
     */
	public get $geolocation(): boolean {
		return this.geolocation;
	}

    /**
     * Setter $geolocation
     * @param {boolean} value
     */
	public set $geolocation(value: boolean) {
		this.geolocation = value;
	}
    private geolocation :boolean=true;


    

}
