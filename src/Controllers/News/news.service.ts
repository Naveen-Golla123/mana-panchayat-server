import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../../Entities/News.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { Category } from "../../Entities/Category.entity";

@Injectable()
export class NewsService {
    
    constructor(@InjectRepository(News) private newsRepository: Repository<News>,@InjectRepository(Category) private categoryRepository: Repository<Category>){

    }

    async getAllNews() {
        return await this.newsRepository.find();
    }

    async getNewsById(newsId) {
        return await this.newsRepository.findBy({id:parseInt(newsId)});
    }


    async createNews(createNewsDto: CreateNewsDto) {
        var news = new News();
        var category = await this.categoryRepository.createQueryBuilder("category")
        .select()
        .where("category.id=:categoryId", {categoryId: createNewsDto.categoryId}).getOne();
        news.title = createNewsDto.title;
        news.MetaDescription = "";
        news.newsDescription = createNewsDto.news;
        news.category = category;
        news.location = createNewsDto.location;
        news.imgUrl = "";
        news.labels = [];
        return await this.newsRepository.save(news);
    }

}