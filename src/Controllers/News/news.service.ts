import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../../Entities/News.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { Category } from "../../Entities/Category.entity";
import { FileUploader } from "src/Shared/FileUploader";
@Injectable()
export class NewsService {

    constructor(@InjectRepository(News) private newsRepository: Repository<News>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        private fileUploader: FileUploader) {

    }

    async getAllNews() {
        return await this.newsRepository.find();
    }

    async getNewsById(newsId) {
        return await this.newsRepository.findBy({ id: parseInt(newsId) });
    }


    async createNews(file: Express.Multer.File, createNewsDto: CreateNewsDto) {
        var news = new News();
        console.log(news.id);

        //upload the file and get the url for the same.
        var uploadedBlobUrl = await this.fileUploader.uploadFile(file);

        // fetching category data.
        var category = await this.categoryRepository.createQueryBuilder("category")
            .select()
            .where("category.id=:categoryId", { categoryId: createNewsDto.categoryId }).getOne();
        news.title = createNewsDto.title;
        news.MetaDescription = "";
        news.newsDescription = createNewsDto.news;
        news.category = category;
        news.location = createNewsDto.location;
        news.imgUrl = uploadedBlobUrl;
        news.labels = [];

        //save new entry to db
        return await this.newsRepository.save(news);
    }


    async updateNews(file: Express.Multer.File, createNewsDto: CreateNewsDto) {

        //upload the file and get the url for the same.
        var uploadedBlobUrl = await this.fileUploader.uploadFile(file);

        var news = await this.newsRepository.createQueryBuilder().update("news").set({
            "title": createNewsDto.title,
            "newsDescription": createNewsDto.news,
            "imgUrl": uploadedBlobUrl,
            "location": createNewsDto.location,
            "MetaDescription": createNewsDto.Metaded,
        }).where(
            "news.id=:id", { id: createNewsDto.id }
        ).execute();
        return news;
    }

}