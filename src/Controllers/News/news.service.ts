import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../../Entities/News.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "../../dto/createNewsDto";
import { Category } from "../../Entities/Category.entity";
import { FileUploader } from "src/Shared/FileUploader";
import { Users } from "src/Entities/Users.entity";
import { Utilies } from "src/Shared/Utlities";
@Injectable()
export class NewsService {

    constructor(@InjectRepository(News) private newsRepository: Repository<News>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private utilies: Utilies,
        private fileUploader: FileUploader) {

    }

    async getAllNews() {
        let newsresult = await this.newsRepository.createQueryBuilder("news").where("news.isDeleted=:isDeleted",{isDeleted:false}).leftJoin("news.author","a").addSelect(["news.*","a.firstname","a.lastname"]).getMany();
        newsresult.forEach(news=>{
            this.processNews(news)
        });
        return newsresult;
    }

    async getNewsById(newsId) {
        let newsResult = await this.newsRepository.createQueryBuilder("news").leftJoin("news.author",'a').where("news.isDeleted=:isDeleted",{isDeleted:false}).where("news.id=:id",{id:newsId}).addSelect(["news.*","a.firstname","a.lastname"]).getOne();
        this.newsRepository.createQueryBuilder("news").update().set({views: ()=>"views+1"}).where("news.id=:id",{id:newsId}).execute();
        this.processNews(newsResult);
        return newsResult;
    }

    async getLatestNews(pageSize: number) {
        var newsresults = await this.newsRepository.createQueryBuilder("news").select().where("news.isDeleted=:isDeleted",{isDeleted:false}).limit(pageSize).orderBy({ "news.createdOn": "DESC" }).getMany();
        newsresults.forEach(news=>{
            this.processNews(news)
        });
        return newsresults;
    }

    async createNews(file: Express.Multer.File, createNewsDto: CreateNewsDto, userContext: any) {
        var news = new News();
        // console.log(file);
        console.log(createNewsDto);
        //upload the file and get the url for the same.
        var uploadedBlobUrl = await this.fileUploader.uploadFile(file);
        // fetching category data.
        var category = await this.categoryRepository.createQueryBuilder("category")
            .select()
            .where("category.id=:categoryId", { categoryId: createNewsDto.categoryId }).getOne();
        news.title = createNewsDto.title;
        news.MetaDescription = createNewsDto.metaDescription;
        news.newsDescription = createNewsDto.news;
        news.category = category;
        news.location = createNewsDto.location;
        news.imgUrl = uploadedBlobUrl;
        news.labels = [];
        var author: Users = await this.userRepository.createQueryBuilder("users").select().where("users.id=:id",{id:userContext.userId}).getOne();
        news.author = author;
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
            "MetaDescription": createNewsDto.metaDescription,
        }).where(
            "news.id=:id", { id: createNewsDto.id }
        ).execute();
        return news;
    }

    async deleteNews(id:number) {
        var news = await this.newsRepository.createQueryBuilder().update("news").set({
            "isDeleted": true
        }).where(
            "news.id=:id", { id: id }
        ).execute();
        return news;
    }

    processNews(news: News){
        news.createOnDate = this.utilies.convertDate(news.createdOn);
    }

    removeHtmlTagesforNewDesc(news: News[]): News[] {
        news.forEach(newsItem => {
            newsItem.newsDescription = newsItem.newsDescription.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, " ");
        });
        return news;
    }
}