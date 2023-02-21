import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../Entities/Users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepository: Repository<Users>, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.createQueryBuilder("users").where("users.username=:username", { username }).getOne()
        if (user && bcrypt.compare(pass, user.password)) {
            return user;
        }
        return null;
    }

    async login(user:any) {
        //console.log("here")
        var result = await this.jwtService.sign({
            userId: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        })
        console.log(result)
        return {
            access_token: result
        };
    }
}