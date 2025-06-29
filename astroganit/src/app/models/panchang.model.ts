// panchang.model.ts

export class PanchangResponse {
    sampurnPanchangModel: SampurnPanchangModel;
    horaResponse: HoraResponse;
    chogdiyaResponse: ChogdiyaResponse;
    doGhatiResponse: DoghatiResponse;
    rahukaalResponse: RahukaalResponse;

    constructor(
        sampurnPanchangModel: SampurnPanchangModel,
        horaResponse: HoraResponse,
        chogdiyaResponse: ChogdiyaResponse,
        doGhatiResponse: DoghatiResponse,
        rahukaalResponse: RahukaalResponse
    ) {
        this.sampurnPanchangModel = sampurnPanchangModel;
        this.horaResponse = horaResponse;
        this.chogdiyaResponse = chogdiyaResponse;
        this.doGhatiResponse = doGhatiResponse;
        this.rahukaalResponse = rahukaalResponse;
    }
}

export class SampurnPanchangModel {
    sunRiseTime: string;
    sunSetTime: string;
    moonRiseAndSetTime: string[];
    tithi: string[];
    tithiInt: number;
    nakshtra: string[];
    yog: string[];
    karan: string[];
    paksha: string;
    vara: string;
    ritu: string;
    moonSign: string[];
    amantMonth: string;
    purnimantMonth: string;
    shakaSamvat: string;
    kaliSamvat: string;
    vikramSamvat: string;
    dayDuration: string;
    abhijitMuhurat: string[];
    ashubhMuhuratList: string[][];
    dishaShool: string;
    tarabal: string;
    chandrabal: string;

    constructor(
        sunRiseTime: string,
        sunSetTime: string,
        moonRiseAndSetTime: string[],
        tithi: string[],
        tithiInt: number,
        nakshtra: string[],
        yog: string[],
        karan: string[],
        paksha: string,
        vara: string,
        ritu: string,
        moonSign: string[],
        amantMonth: string,
        purnimantMonth: string,
        shakaSamvat: string,
        kaliSamvat: string,
        vikramSamvat: string,
        dayDuration: string,
        abhijitMuhurat: string[],
        ashubhMuhuratList: string[][],
        dishaShool: string,
        tarabal: string,
        chandrabal: string
    ) {
        this.sunRiseTime = sunRiseTime;
        this.sunSetTime = sunSetTime;
        this.moonRiseAndSetTime = moonRiseAndSetTime;
        this.tithi = tithi;
        this.tithiInt = tithiInt;
        this.nakshtra = nakshtra;
        this.yog = yog;
        this.karan = karan;
        this.paksha = paksha;
        this.vara = vara;
        this.ritu = ritu;
        this.moonSign = moonSign;
        this.amantMonth = amantMonth;
        this.purnimantMonth = purnimantMonth;
        this.shakaSamvat = shakaSamvat;
        this.kaliSamvat = kaliSamvat;
        this.vikramSamvat = vikramSamvat;
        this.dayDuration = dayDuration;
        this.abhijitMuhurat = abhijitMuhurat;
        this.ashubhMuhuratList = ashubhMuhuratList;
        this.dishaShool = dishaShool;
        this.tarabal = tarabal;
        this.chandrabal = chandrabal;
    }
}

export class HoraResponse {
    horaList: Hora[];
    dayHoraList: Hora[];
    nightHoraList: Hora[];

    constructor(horaList: Hora[], dayHoraList: Hora[], nightHoraList: Hora[]) {
        this.horaList = horaList;
        this.dayHoraList = dayHoraList;
        this.nightHoraList = nightHoraList;
    }
}

export class Hora {
    planetName: string;
    enterTime: string;
    exitTime: string;
    planetMeaning: string;
    planetCurrentHoraMeaning: string;
    duration: string;

    constructor(
        planetName: string,
        enterTime: string,
        exitTime: string,
        planetMeaning: string,
        planetCurrentHoraMeaning: string,
        duration: string
    ) {
        this.planetName = planetName;
        this.enterTime = enterTime;
        this.exitTime = exitTime;
        this.planetMeaning = planetMeaning;
        this.planetCurrentHoraMeaning = planetCurrentHoraMeaning;
        this.duration = duration;
    }
}

export class ChogdiyaResponse {
    chogdiyaList: Chogdiya[];
    dayChogdiyaList: Chogdiya[];
    nightChogdiyaList: Chogdiya[];

    constructor(
        chogdiyaList: Chogdiya[],
        dayChogdiyaList: Chogdiya[],
        nightChogdiyaList: Chogdiya[]
    ) {
        this.chogdiyaList = chogdiyaList;
        this.dayChogdiyaList = dayChogdiyaList;
        this.nightChogdiyaList = nightChogdiyaList;
    }
}

export class Chogdiya {
    planetName: string;
    enterTime: string;
    exitTime: string;
    planetMeaning: string;
    duration: string;

    constructor(
        planetName: string,
        enterTime: string,
        exitTime: string,
        planetMeaning: string,
        duration: string
    ) {
        this.planetName = planetName;
        this.enterTime = enterTime;
        this.exitTime = exitTime;
        this.planetMeaning = planetMeaning;
        this.duration = duration;
    }

}
export class DoghatiResponse {
    doGhatiList: DoGhati[];
    dayDoGhatiList: DoGhati[];
    nightDoGhatiList: DoGhati[];

    constructor(
        doGhatiList: DoGhati[],
        dayDoGhatiList: DoGhati[],
        nightDoGhatiList: DoGhati[]
    ) {
        this.doGhatiList = doGhatiList;
        this.dayDoGhatiList = dayDoGhatiList;
        this.nightDoGhatiList = nightDoGhatiList;
    }
}

export class DoGhati {
    planetName: string;
    enterTime: string;
    exitTime: string;
    planetMeaning: string;
    planetCurrentHoraMeaning: string;
    doGhatiSecondMeaning: string;
    doGhatiSecondMeaningWikipedia: string;
    doGhatiMuhurat: string;
    duration: string;

    constructor(
        planetName: string,
        enterTime: string,
        exitTime: string,
        planetMeaning: string,
        planetCurrentHoraMeaning: string,
        doGhatiSecondMeaning: string,
        doGhatiSecondMeaningWikipedia: string,
        doGhatiMuhurat: string,
        duration: string,
    ) {
        this.planetName = planetName;
        this.enterTime = enterTime;
        this.exitTime = exitTime;
        this.planetMeaning = planetMeaning;
        this.planetCurrentHoraMeaning = planetCurrentHoraMeaning;
        this.doGhatiSecondMeaning = doGhatiSecondMeaning;
        this.doGhatiSecondMeaningWikipedia = doGhatiSecondMeaningWikipedia;
        this.doGhatiMuhurat = doGhatiMuhurat;
        this.duration = duration;
    }

}
export class RahukaalResponse {
    arrayList: Rahukaal[];
    constructor(
        arrayList: Rahukaal[],
    ) {
        this.arrayList = arrayList;
    }
}
export class Rahukaal {
    date: string;
    from: string;
    to: string;
    constructor(
        date: string,
        from: string,
        to: string
    ) {
        this.date = date;
        this.from = from;
        this.to = to;
    }
}