import { Injectable } from "@nestjs/common";

@Injectable()
export class SharedService {
    
    private userContext: any;
    
    constructor(){}

    getUserContext(){
        return this.userContext;
    }

    setUserContext(userContext) {
        this.userContext = userContext;
    }
}