// src/app/models/festival.model.ts

export interface Festival {
    festName: string;
    festDate: number; // Julian date number like 2460677.0
    festType: string;
    imgUrl: string;
}

export interface FestMonth {
    [month: string]: Festival[][];
}

export interface FestDetailResponse {
    festDetail: FestMonth;
}
