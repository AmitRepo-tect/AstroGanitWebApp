export interface MuhuratResponse {
    muhuratDetail: MonthlyMuhuratModel[];
}

export interface MonthlyMuhuratModel {
    heading: string;
    muhurat: Muhurat[];
}

export interface Muhurat {
    day: string;
    tithi: string;
    var: string;
    nakshtra: string;
    time: string;
}
