export class Place {
    id: number;
    place: string;
    latDeg: string;
    latMin: string;
    latNS: string;
    longDeg: string;
    longMin: string;
    longEW: string;
    state: string;
    country: string;
    timezone: string;
    timezoneStr: string;
    longitude: string;
    latitude: string;




    // Default constructor with default values
    constructor(
        id: number = 0,
        place: string = '',
        latDeg: string = '',
        latMin: string = '',
        latNS: string = '',
        latitude: string = '',
        longDeg: string = '',
        longMin: string = '',
        longEW: string = '',
        longitude: string = '',
        state: string = '',
        country: string = '',
        timezone: string = '',
        timezoneStr: string = ''
    ) {
        this.id = id;
        this.place = place;
        this.latDeg = latDeg;
        this.latMin = latMin;
        this.latNS = latNS;
        this.latitude = latitude;
        this.longDeg = longDeg;
        this.longMin = longMin;
        this.longEW = longEW;
        this.longitude = longitude;
        this.state = state;
        this.country = country;
        this.timezone = timezone;
        this.timezoneStr = timezoneStr;
    }
    get Id(): number {
        return this.id;
    }
    set Id(value: number) {
        this.id = value;
    }

    get Place(): string {
        return this.place;
    }
    set Place(value: string) {
        this.place = value;
    }

    get LatDeg(): string {
        return this.latDeg;
    }
    set LatDeg(value: string) {
        this.latDeg = value;
    }

    get LatMin(): string {
        return this.latMin;
    }
    set LatMin(value: string) {
        this.latMin = value;
    }

    get LatNS(): string {
        return this.latNS;
    }
    set LatNS(value: string) {
        this.latNS = value;
    }

    get LongDeg(): string {
        return this.longDeg;
    }
    set LongDeg(value: string) {
        this.longDeg = value;
    }

    get LongMin(): string {
        return this.longMin;
    }
    set LongMin(value: string) {
        this.longMin = value;
    }

    get LongEW(): string {
        return this.longEW;
    }
    set LongEW(value: string) {
        this.longEW = value;
    }

    get State(): string {
        return this.state;
    }
    set State(value: string) {
        this.state = value;
    }

    get Country(): string {
        return this.country;
    }
    set Country(value: string) {
        this.country = value;
    }

    get Timezone(): string {
        return this.timezone;
    }
    set Timezone(value: string) {
        this.timezone = value;
    }

    get TimezoneStr(): string {
        return this.timezoneStr;
    }
    set TimezoneStr(value: string) {
        this.timezoneStr = value;
    }
    get Latitude(): string {
        return this.latitude;
    }
    set Latitude(value: string) {
        this.latitude = value;
    }

    get Longitude(): string {
        return this.longitude;
    }
    set Longitude(value: string) {
        this.longitude = value;
    }

    static fromJson(json: any): Place {
        return new Place(
            json.id,
            json.place,
            json.latDeg,
            json.latMin,
            json.latNS,
            json.latitude,
            json.longDeg,
            json.longMin,
            json.longEW,
            json.longitude,
            json.state,
            json.country,
            json.timezone,
            json.timezoneStr
        );
    }
}
