import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { NewsService } from "./news.service";

@Controller("News")
export class NewsController {

    constructor(private newsService: NewsService){

    }

    @Get()
    getAllNews(){

    }

    @Post()
    async createNews(@Body() createNewsDto: CreateNewsDto){
        return await this.newsService.createNews(createNewsDto)
    }

    @Patch()
    updateNews(){

    }

    @Get(":id")
    getNewsbyId(){

    }
}