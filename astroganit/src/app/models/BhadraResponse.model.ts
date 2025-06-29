export interface TimePeriod {
    startDay: string;
    startMonth: string;
    startDate: string;
    startTime: string;
    endDay: string;
    endMonth: string;
    endDate: string;
    endTime: string;
}

export interface BhadraResponse {
    arrayList: TimePeriod[];
}
