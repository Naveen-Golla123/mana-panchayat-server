import { Body, Controller, Get, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { NewsService } from "./news.service";

@Controller("News")
export class NewsController {

    constructor(private newsService: NewsService) { }

    @Get()
    async getAllNews() {
        return await this.newsService.getAllNews();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async createNews(@UploadedFile() file: Express.Multer.File, @Body() createNewsDto: CreateNewsDto, @Req() req: any) {
        return await this.newsService.createNews(file, createNewsDto,req.user)
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateNews(@UploadedFile() file: Express.Multer.File, @Body() createNewsDto: CreateNewsDto) {
        console.log(createNewsDto)
        return await this.newsService.updateNews(file, createNewsDto);
    }

    @Get(":id")
    async getNewsbyId(@Param('id') id, @Res() res: Response) {
        var result = await this.newsService.getNewsById(id)
        console.log(result)
        return res.render('viewnews',result);
    }

    @Get("/latest/:pageSize")
    async getLatestNews(@Param("pageSize") pageSize: number) {
        return await this.newsService.getLatestNews(pageSize);
    }

    @Post("delete/:id")
    async deleteNews(@Param('id') id:number) {
        return await this.newsService.deleteNews(id);
    }
}