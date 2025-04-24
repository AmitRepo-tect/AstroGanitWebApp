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

    constructor(data: any) {
        this.sunRiseTime = data.sunRiseTime;
        this.sunSetTime = data.sunSetTime;
        this.moonRiseAndSetTime = data.moonRiseAndSetTime;
        this.tithi = data.tithi;
        this.tithiInt = data.tithiInt;
        this.nakshtra = data.nakshtra;
        this.yog = data.yog;
        this.karan = data.karan;
        this.paksha = data.paksha;
        this.vara = data.vara;
        this.ritu = data.ritu;
        this.moonSign = data.moonSign;
        this.amantMonth = data.amantMonth;
        this.purnimantMonth = data.purnimantMonth;
        this.shakaSamvat = data.shakaSamvat;
        this.kaliSamvat = data.kaliSamvat;
        this.vikramSamvat = data.vikramSamvat;
        this.dayDuration = data.dayDuration;
        this.abhijitMuhurat = data.abhijitMuhurat;
        this.ashubhMuhuratList = data.ashubhMuhuratList;
        this.dishaShool = data.dishaShool;
        this.tarabal = data.tarabal;
        this.chandrabal = data.chandrabal;
    }
}

export class HoraResponse {
    horaList: Hora[];
    dayHoraList: Hora[];
    nightHoraList: Hora[];

    constructor(data: any) {
        this.horaList = data.horaList.map((item: any) => new Hora(item));
        this.dayHoraList = data.dayHoraList.map((item: any) => new Hora(item));
        this.nightHoraList = data.nightHoraList.map((item: any) => new Hora(item));
    }
}

export class Hora {
    planetName: string;
    enterTime: string;
    exitTime: string;
    planetMeaning: string;
    planetCurrentHoraMeaning: string;
    duration: string;

    constructor(data: any) {
        this.planetName = data.planetName;
        this.enterTime = data.enterTime;
        this.exitTime = data.exitTime;
        this.planetMeaning = data.planetMeaning;
        this.planetCurrentHoraMeaning = data.planetCurrentHoraMeaning;
        this.duration = data.duration;
    }
}

export class ChogdiyaResponse {
    chogdiyaList: Chogdiya[];
    dayChogdiyaList: Chogdiya[];
    nightChogdiyaList: Chogdiya[];

    constructor(data: any) {
        this.chogdiyaList = data.chogdiyaList.map((item: any) => new Chogdiya(item));
        this.dayChogdiyaList = data.dayChogdiyaList.map((item: any) => new Chogdiya(item));
        this.nightChogdiyaList = data.nightChogdiyaList.map((item: any) => new Chogdiya(item));
    }
}

export class Chogdiya {
    planetName: string;
    enterTime: string;
    exitTime: string;
    planetMeaning: string;
    duration: string;

    constructor(data: any) {
        this.planetName = data.planetName;
        this.enterTime = data.enterTime;
        this.exitTime = data.exitTime;
        this.planetMeaning = data.planetMeaning;
        this.duration = data.duration;
    }
}

export class PanchangData {
    sampurnPanchangModel: SampurnPanchangModel;
    horaResponse: HoraResponse;
    chogdiyaResponse: ChogdiyaResponse;

    constructor(data: any) {
        this.sampurnPanchangModel = new SampurnPanchangModel(data.sampurnPanchangModel);
        this.horaResponse = new HoraResponse(data.horaResponse);
        this.chogdiyaResponse = new ChogdiyaResponse(data.chogdiyaResponse);
    }
}
