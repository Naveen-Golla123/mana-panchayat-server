import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../../Entities/Category.entity";
import { News } from "../../Entities/News.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
    imports:[TypeOrmModule.forFeature([News, Category])],
    providers: [NewsService],
    controllers: [NewsController]
})
export class NewsModule{}