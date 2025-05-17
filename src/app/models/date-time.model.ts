export class DateTime {
    private date: number;
    private month: string;
    private year: number;
    private hr: number;
    private min: number;
    private sec: number;
    private timezone: number;

    constructor(
        date: number = 1,
        month: string = "January",
        year: number = 2025,
        hr: number = 10,
        min: number = 10,
        sec: number = 10,
        timezone: number = 5.5
    ) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.hr = hr;
        this.min = min;
        this.sec = sec;
        this.timezone = timezone;
    }

    // Getter and Setter for date
    getDate(): number {
        return this.date;
    }

    setDate(date: number): void {
        this.date = date;
    }

    // Getter and Setter for month
    getMonth(): string {
        return this.month;
    }

    setMonth(month: string): void {
        this.month = month;
    }

    // Getter and Setter for year
    getYear(): number {
        return this.year;
    }

    setYear(year: number): void {
        this.year = year;
    }

    // Getter and Setter for hour
    getHr(): number {
        return this.hr;
    }

    setHr(hr: number): void {
        this.hr = hr;
    }

    // Getter and Setter for minute
    getMin(): number {
        return this.min;
    }

    setMin(min: number): void {
        this.min = min;
    }

    // Getter and Setter for second
    getSec(): number {
        return this.sec;
    }

    setSec(sec: number): void {
        this.sec = sec;
    }

    // Getter and Setter for timezone
    getTimezone(): number {
        return this.timezone;
    }

    setTimezone(timezone: number): void {
        this.timezone = timezone;
    }
}
