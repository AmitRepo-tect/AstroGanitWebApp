export class CharAntaraDashaBean {
    planetName: string;
    startDate: string;
    endDate: string;

    constructor(
        planetName: string = '',
        startDate: string = '',
        endDate: string = ''
    ) {
        this.planetName = planetName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
