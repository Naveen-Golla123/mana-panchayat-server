import { Body, Controller, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
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
    async createNews(@Body() createNewsDto: CreateNewsDto) {
        return await this.newsService.createNews(createNewsDto)
    }

    @Patch()
    updateNews() {

    }

    @Get(":id")
    async getNewsbyId(@Param('id') id) {
        return await this.newsService.getNewsById(id);
    }
}