export class DasaBean {
    planetNo: number;
    planetName: string;
    day: number;
    month: number;
    year: number;
    dasaTime: number;
    dasaTimeStr: string;

    constructor(
        planetNo: number = 0,
        planetName: string = '',
        day: number = 0,
        month: number = 0,
        year: number = 0,
        dasaTime: number = 0.0,
        dasaTimeStr: string = ''
    ) {
        this.planetNo = planetNo;
        this.planetName = planetName;
        this.day = day;
        this.month = month;
        this.year = year;
        this.dasaTime = dasaTime;
        this.dasaTimeStr = dasaTimeStr;
    }

    get PlanetNo(): number {
        return this.planetNo;
    }
    set PlanetNo(value: number) {
        this.planetNo = value;
    }

    get PlanetName(): string {
        return this.planetName;
    }
    set PlanetName(value: string) {
        this.planetName = value;
    }

    get Day(): number {
        return this.day;
    }
    set Day(value: number) {
        this.day = value;
    }

    get Month(): number {
        return this.month;
    }
    set Month(value: number) {
        this.month = value;
    }

    get Year(): number {
        return this.year;
    }
    set Year(value: number) {
        this.year = value;
    }

    get DasaTime(): number {
        return this.dasaTime;
    }
    set DasaTime(value: number) {
        this.dasaTime = value;
    }

    get DasaTimeStr(): string {
        return this.dasaTimeStr;
    }
    set DasaTimeStr(value: string) {
        this.dasaTimeStr = value;
    }
}
