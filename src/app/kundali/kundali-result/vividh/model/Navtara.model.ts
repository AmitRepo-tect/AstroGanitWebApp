export class NavtaraModel {
    planet: number
    fchakra: number
    schakra: number
    tchakra: number
    lord: number
    constructor(
        planet: number,
        fchakra: number,
        schakra: number,
        tchakra: number,
        lord: number
    ) {
        this.planet = planet;
        this.fchakra = fchakra;
        this.schakra = schakra;
        this.tchakra = tchakra;
        this.lord = lord;
    }
}