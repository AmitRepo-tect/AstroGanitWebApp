export class DailyHoroscope {

    public love: string;
    public wealth: string;
    public family: string;
    public carrer: string;
    public health: string;
    public luckyNumber: number;

    constructor(
        love: string = '',
        wealth: string = '',
        family: string = '',
        carrer: string = '',
        health: string = '',
        luckyNumber: number = 5
    ) {
        this.love = love;
        this.wealth = wealth;
        this.family = family;
        this.carrer = carrer;
        this.health = health;
        this.luckyNumber = luckyNumber;
    }
}