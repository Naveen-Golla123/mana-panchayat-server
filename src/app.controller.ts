import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { json } from 'stream/consumers';
import { AppService } from './app.service';
import { NewsService } from './Controllers/News/news.service';
import { UserDto } from './dto/userDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private newsService: NewsService) {}

  @Get()
  @Render("home.hbs")
  async getHello(): Promise<any> {
    console.log("hello")
    var result = await this.newsService.getLatestNews(10);
    result = this.newsService.removeHtmlTagesforNewDesc(result);
    return {
      data:result
    };
  }

  @Post("register")
  async registerUser(@Body() userDto: UserDto) {
    return await this.appService.registerUser(userDto);
  }
}
