import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { NewsService } from "./news.service";

@Controller("News")
export class NewsController {

    constructor(private newsService: NewsService) {}

    @Get()
    async getAllNews() {
        return await this.newsService.getAllNews();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async createNews(@UploadedFile() file: Express.Multer.File,@Body() createNewsDto: CreateNewsDto) {
        return await this.newsService.createNews(file,createNewsDto)
    }

    @Patch()
    // @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateNews(@UploadedFile() file: Express.Multer.File,@Body() createNewsDto: CreateNewsDto) {
        console.log(createNewsDto)
        return await this.newsService.updateNews(file,createNewsDto);
    }

    @Get(":id")
    async getNewsbyId(@Param('id') id) {
        return await this.newsService.getNewsById(id);
    }
}