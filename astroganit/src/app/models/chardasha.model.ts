import { CharAntaraDashaBean } from "./CharAnterDasha.model";

export class CharDashaBean {
    planetName: string;
    duration: number;
    startYear: string;
    endYear: string;
    charAntaraDashaList: CharAntaraDashaBean[];

    constructor(
        planetName: string = '',
        duration: number = 0,
        startYear: string = '',
        endYear: string = '',
        charAntaraDashaList: CharAntaraDashaBean[] = []
    ) {
        this.planetName = planetName;
        this.duration = duration;
        this.startYear = startYear;
        this.endYear = endYear;
        this.charAntaraDashaList = charAntaraDashaList;
    }
}