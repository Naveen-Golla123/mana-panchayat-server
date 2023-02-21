import { Injectable } from "@nestjs/common";

@Injectable()
export class Utilies {
    constructor(){

    }

    convertDate(rawDate): string{
        var date = new Date(rawDate);
        let options: any = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        return date.toLocaleDateString("te-IN",options);
    }
}