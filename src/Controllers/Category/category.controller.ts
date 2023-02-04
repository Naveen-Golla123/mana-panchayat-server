import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
    @UseGuards(AuthGuard('jwt'))
    async createCategory(@Body() createCategoryDto: CreateLabelDto) {
        return await this.categoryservice.createCategory(createCategoryDto);
    }
}