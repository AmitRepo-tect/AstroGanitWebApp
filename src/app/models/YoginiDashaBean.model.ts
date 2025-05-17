import { CharAntaraDashaBean } from "./CharAnterDasha.model";

export class YoginiDashaBean {
    planetName: string;
    duration: number;
    startYear: string;
    endYear: string;
    antaraDashaList: CharAntaraDashaBean[];

    constructor(
        planetName: string = '',
        duration: number = 0,
        startYear: string = '',
        endYear: string = '',
        antaraDashaList: CharAntaraDashaBean[] = []
    ) {
        this.planetName = planetName;
        this.duration = duration;
        this.startYear = startYear;
        this.endYear = endYear;
        this.antaraDashaList = antaraDashaList;
    }
}