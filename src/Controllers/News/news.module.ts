import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileUploader } from "src/Shared/FileUploader";
import { Category } from "../../Entities/Category.entity";
import { News } from "../../Entities/News.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";

@Module({
    imports:[TypeOrmModule.forFeature([News, Category])],
    providers: [NewsService,FileUploader],
    controllers: [NewsController]
})
export class NewsModule{}