import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileUploader } from "../../Shared/FileUploader";
import { Category } from "../../Entities/Category.entity";
import { News } from "../../Entities/News.entity";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { Users } from "src/Entities/Users.entity";
import { Utilies } from "src/Shared/Utlities";

@Module({
    imports:[TypeOrmModule.forFeature([News, Category,Users])],
    providers: [NewsService,FileUploader,Utilies],
    controllers: [NewsController]
})
export class NewsModule{}