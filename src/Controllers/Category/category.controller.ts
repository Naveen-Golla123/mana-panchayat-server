import { Body, Controller, Get, Post } from "@nestjs/common";
import { createCategoryDto } from "../../dto/createCategoryDto";
import { CreateLabelDto } from "../../dto/createLabelDto";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
    
    constructor(private categoryservice: CategoryService){

    }

    @Get()
    getAllCategories(){

    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateLabelDto) {
        return await this.categoryservice.createCategory(createCategoryDto);
    }
}