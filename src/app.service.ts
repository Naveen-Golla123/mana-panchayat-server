import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto';
import { Users } from './Entities/Users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {

  constructor(@InjectRepository(Users) private userRepository: Repository<Users>){

  }

  getHello(): string {
    return 'Hello World!';
  }

  async registerUser(userDto: UserDto): Promise<Users> {
    var user = new Users()

    var isUserExist = await this.userRepository.createQueryBuilder("users").select().where("username=:username",{username: userDto.username});

    if(!isUserExist) {
      throw new InternalServerErrorException("Username already exists");
    }
    user.firstname = userDto.firstname 
    user.lastname = userDto.lastname;
    user.username = userDto.username;
    user.password = userDto.password;
    user.phone = userDto.phone;
    user.password = await bcrypt.hash(userDto.password,12);
    return await this.userRepository.save(user);
  }
}
