
export class YearlyHoroscope {

    education: string;
    marriage: string;
    finance: string;
    business: string;
    carrer: string;
    love: string;
    health: string;
    family: string;

    constructor(
        education: string = '',
        marriage: string = '',
        finance: string = '',
        business: string = '',
        carrer: string = '',
        love: string = '',
        health: string = '',
        family: string = ''
    ) {
        this.education = education;
        this.marriage = marriage;
        this.finance = finance;
        this.business = business;
        this.carrer = carrer;
        this.love = love;
        this.health = health;
        this.family = family;
    }
}

