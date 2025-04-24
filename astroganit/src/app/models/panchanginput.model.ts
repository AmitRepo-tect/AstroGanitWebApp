import { Place } from "./place.model";

export class PanchangInput {
    private _place: Place;
    private _date: Date;

    constructor(place: Place, date: Date) {
        this._place = place;
        this._date = date;
    }

    // Getter and Setter for 'place'
    get place(): Place {
        return this._place;
    }

    set place(value: Place) {
        this._place = value;
    }

    // Getter and Setter for 'date'
    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}
