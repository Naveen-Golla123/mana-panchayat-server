import { Body, Controller, Get, Param, Patch, Post, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { NewsService } from "./news.service";
import { FastifyRequest } from "fastify";

@Controller("News")
export class NewsController {

    constructor(private newsService: NewsService) { }

    @Get()
    async getAllNews() {
        return await this.newsService.getAllNews();
    }

    @Get('/createNews')
    @UseGuards(AuthGuard('jwt'))
    @Render('createNewsPost.hbs')
    createNewsPage(@Req() req: Request) {
        // console.log(req)
        return {
            result: true,
            env: process.env.BASE_URL
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor("file"))
    async createNews(@UploadedFile() file: Express.Multer.File, @Body() createNewsDto: CreateNewsDto, @Req() req: any) {
        return await this.newsService.createNews(file, createNewsDto,req.user)
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async updateNews(@UploadedFile() file: Express.Multer.File, @Body() createNewsDto: CreateNewsDto) {
        return await this.newsService.updateNews(file, createNewsDto);
    }

    @Get(":id")
    @Render("viewnews.hbs")
    async getNewsbyId(@Param('id') id) {

        var result = await this.newsService.getNewsById(id)
        return result;
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