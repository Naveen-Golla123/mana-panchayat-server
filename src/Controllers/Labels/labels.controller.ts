import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateLabelDto } from "../../dto/createLabelDto";
import { LabelsService } from "./labels.service";

@Controller("labels")
export class LabelsController {

    constructor(private labelsService: LabelsService){

    }

    @Get()
    async getAllLabels() {
        return await this.labelsService.getAllLabels();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createLabel(@Body() createLableDto: CreateLabelDto) {
        return await this.labelsService.createLabel(createLableDto);
    }
}
