import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/Shared/SharedService';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "this is mana-panchayat-web-server",
    });
  }

  async validate(payload: any) {
    var userContext = { userId: payload.userId, username: payload.username, firstname: payload.firstname, lastname: payload.lastname }
    //this.sharedService.setUserContext(userContext)
    return userContext;
  }
}