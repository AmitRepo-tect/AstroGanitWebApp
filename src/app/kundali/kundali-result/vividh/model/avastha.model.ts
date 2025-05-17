export class AvasthaModel {
    planet: number;
    jaagritAvastha: number;
    baladiAvastha: number;
    diptadiAvastha: number;

    constructor(
        planet: number,
        jaagritAvastha: number,
        baladiAvastha: number,
        diptadiAvastha: number
    ) {
        this.planet = planet;
        this.jaagritAvastha = jaagritAvastha;
        this.baladiAvastha = baladiAvastha;
        this.diptadiAvastha = diptadiAvastha;
    }
}
