export class GeofencingnSettings {

    private geofencing:boolean=true;

    /**
     * Getter $geofencing
     * @return {boolean}
     */
	public get $geofencing(): boolean {
		return this.geofencing;
	}

    /**
     * Setter $geofencing
     * @param {boolean} value
     */
	public set $geofencing(value: boolean) {
        this.geofencing = value;
        localStorage.setItem('geofencing', String(value))
	}
   

}
