import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthDto } from "../../dto/authDto";
import { Users } from "../../Entities/Users.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("Auth")
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post("signIn")
    @UseGuards(AuthGuard('local'))
    async signIn(@Body() authDto: AuthDto,@Req() req:any) {
        return await this.authService.login(req.user);
    }
}