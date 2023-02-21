import { Body, Controller, Get, Post, Render, Req, Res, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthDto } from "../../dto/authDto";
import { Users } from "../../Entities/Users.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { FastifyReply, FastifyRequest } from "fastify";
import { RequestParser } from "./Pipes/RequestParser";

@Controller("Auth")
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Get()
    //@UsePipes(new RequestParser())
    @Render('login.hbs')
    signInPage(@Req() req: FastifyRequest){
        console.log(req)
        return 1
    }

    @Post("signIn")
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() authDto: AuthDto,@Req() req:any,@Res({ passthrough: true }) res: FastifyReply) {
        // console.log(req.cookies);
        var token = await this.authService.login(req.user);
        res.setCookie("panchayatToken", token.access_token, {maxAge: 99999999, secure: true, sameSite:'none',path: '/'});
        return {
            "loggedIn" : true 
        }
    }
}