import { Body, Controller, Get, Post, Render, Req, Res, UnauthorizedException, UseGuards, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthDto } from "../../dto/authDto";
import { Users } from "../../Entities/Users.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
// import { FastifyReply, FastifyRequest } from "fastify";
// import { RequestParser } from "./Pipes/RequestParser";

@Controller("Auth")
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Get()
    //@UsePipes(new RequestParser())
    @Render('login.hbs')
    signInPage(@Req() req: Request){
        return {
            result: true,
            env: process.env.BASE_URL
        }
    }

    @Get("signUp")
    @Render("signup.hbs")
    signUpPage(@Req() req: Request){
        return {
            result: true,
            env: process.env.BASE_URL
        }
    }

    @Post("signIn")
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() authDto: AuthDto,@Req() req:any,@Res({ passthrough: true }) res: Response) {
        var token = await this.authService.login(req.user);
        res.cookie("panchayatToken", token.access_token, {maxAge: 99999999, secure: true, sameSite:'none',path: '/'});
        return {
            "loggedIn" : true 
        }
    }
}