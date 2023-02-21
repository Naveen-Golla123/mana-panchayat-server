import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { NewsService } from './Controllers/News/news.service';
import { UserDto } from './dto/userDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private newsService: NewsService) {}

  @Get()
  @Render("home.hbs")
  async getHello(): Promise<any> {
    var result = await this.newsService.getLatestNews(10);
    console.log(result)
    return result;
  }

  @Post("register")
  async registerUser(@Body() userDto: UserDto) {
    return await this.appService.registerUser(userDto);
  }
}
