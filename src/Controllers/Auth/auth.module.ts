import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entities/Users.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from '@nestjs/jwt'
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[TypeOrmModule.forFeature([Users]),
    JwtModule.register({
        secret: "this is mana-panchayat-web-server",
        signOptions: { expiresIn: "2 days"}
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule{}