import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/userDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("viewnews.hbs")
  getHello(): any {
    return {message:"Hello"}
    //return this.appService.getHello();
  }

  @Post("register")
  async registerUser(@Body() userDto: UserDto) {
    return await this.appService.registerUser(userDto);
  }
}
