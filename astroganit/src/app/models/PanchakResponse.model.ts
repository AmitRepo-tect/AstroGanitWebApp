export interface EventPeriod {
    startDate: string;
    endDate: string;
    startDay: string;
    endDay: string;
    startTime: string;
    endTime: string;
    startMonth: string;
    endMonth: string;
    startYear: string;
    endYear: string;
}

export interface PanchakResponse {
    arrayList: EventPeriod[];
}
