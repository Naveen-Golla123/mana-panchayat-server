import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Inject, Injectable, Scope } from '@nestjs/common';
import { SharedService } from 'src/Shared/SharedService';
// import { FastifyReply, FastifyRequest } from 'fastify';
import { hostname } from 'os';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {

  constructor() {
    
    const cookieExtractor = (req) => {
      var token = null;
      token = req.cookies["panchayatToken"]
      return token;
    };

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor,ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: "this is mana-panchayat-web-server"
    });
  }

  async validate(payload: any) {
    console.log(payload);
    var userContext = { userId: payload.userId, username: payload.username, firstname: payload.firstname, lastname: payload.lastname }
    //this.sharedService.setUserContext(userContext)
    return userContext;
  }
}