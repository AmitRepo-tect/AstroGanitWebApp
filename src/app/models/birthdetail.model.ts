import { DateTime } from "./date-time.model";
import { Place } from "./place.model";

export class BirthDetail {
    private name: string;
    private sex: string;
    private dst: string;
    private kphn: string;
    private ayanamsa: string;
    private languageCode: string;
    private dateTime: DateTime;
    private place: Place;

    constructor(
        name: string = "",
        sex: string = "",
        dst: string = "",
        kphn: string = "0",
        ayanamsa: string = "",
        languageCode: string = "",
        dateTime: DateTime = new DateTime(),
        place: Place = new Place()
    ) {
        this.name = name;
        this.sex = sex;
        this.dst = dst;
        this.kphn = kphn;
        this.ayanamsa = ayanamsa;
        this.languageCode = languageCode;
        this.dateTime = dateTime;
        this.place = place;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getSex(): string {
        return this.sex;
    }

    public setSex(value: string): void {
        this.sex = value;
    }

    public getDst(): string {
        return this.dst;
    }

    public setDst(value: string): void {
        this.dst = value;
    }

    public getKphn(): string {
        return this.kphn;
    }

    public setKphn(value: string): void {
        this.kphn = value;
    }

    public getAyanamsa(): string {
        return this.ayanamsa;
    }

    public setAyanamsa(value: string): void {
        this.ayanamsa = value;
    }

    public getLanguageCode(): string {
        return this.languageCode;
    }

    public setLanguageCode(value: string): void {
        this.languageCode = value;
    }

    public getDateTime(): DateTime {
        return this.dateTime;
    }

    public setDateTime(value: DateTime): void {
        this.dateTime = value;
    }

    public getPlace(): Place {
        return this.place;
    }

    public setPlace(value: Place): void {
        this.place = value;
    }
}
