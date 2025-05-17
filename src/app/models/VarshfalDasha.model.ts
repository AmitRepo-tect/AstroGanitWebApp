export class VarshfalDasha {
    planetNo: number;
    planetRashiBhav: number = -1;
    startTime: string;
    endTime: string;
    result: string = '';

    constructor(planetNo: number = -1,
        planetRashiBhav: number = -1,
        startTime: string = '',
        endTime: string = '',
        result: string = '') {
        this.planetNo = planetNo;
        this.planetRashiBhav = planetRashiBhav;
        this.startTime = startTime;
        this.endTime = endTime;
        this.result = result;
    }
}
