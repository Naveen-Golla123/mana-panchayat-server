import { Controller, Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../Entities/Users.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { APP_PIPE } from "@nestjs/core";
import { RequestParser } from "./Pipes/RequestParser";

@Module({
    imports: [TypeOrmModule.forFeature([Users]),
    JwtModule.register({
        secret: "this is mana-panchayat-web-server",
        signOptions: { expiresIn: "2 days" }
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy,
        {
            provide: APP_PIPE,
            useClass: RequestParser,
        },],
    controllers: [AuthController]
})
export class AuthModule { }