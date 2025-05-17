export class BasicKundliPlanetData {

    public planet: string;
    public rashi: string;
    public rashiLord: string;
    public naksh: string;
    public nakshLord: string;
    public deg: string;
    public planetBhav: number;
    public combust: string;
    public retrograte: string;
    constructor(
        planet: string = '',
        rashi: string = '',
        rashiLord: string = '',
        naksh: string = '',
        nakshLord: string = '',
        deg: string = '',
        planetBhav: number = 0,
        combust: string = '',
        retrograte: string = ''
    ) {
        this.planet = planet;
        this.rashi = rashi;
        this.rashiLord = rashiLord;
        this.naksh = naksh;
        this.nakshLord = nakshLord;
        this.deg = deg;
        this.planetBhav = planetBhav;
        this.combust = combust
        this.retrograte = retrograte
    }
}