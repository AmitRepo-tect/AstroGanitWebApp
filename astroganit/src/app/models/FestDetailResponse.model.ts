// src/app/models/festival.model.ts

export interface Festival {
    festName: string;
    festDate: number;
    festType: string;
    imgUrl: string;
}

export interface FestDetailResponse {
    festDetail: Festival[][];
}
