import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/Entities/Category.entity";
import { News } from "src/Entities/News.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
    imports:[TypeOrmModule.forFeature([News, Category])],
    providers: [NewsService],
    controllers: [NewsController]
})
export class NewsModule{}