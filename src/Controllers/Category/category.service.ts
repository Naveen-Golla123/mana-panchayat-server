import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLabelDto } from "../../dto/createLabelDto";
import { Category } from "../../Entities/Category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){

    }

    async createCategory(createCategoryDto: CreateLabelDto) {
        var category = new Category()
        category.name = createCategoryDto.name;
        return await this.categoryRepository.save(category);
    }
}