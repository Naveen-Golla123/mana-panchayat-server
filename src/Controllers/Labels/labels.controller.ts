import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateLabelDto } from "../../dto/createLabelDto";
import { LabelsService } from "./labels.service";

@Controller("labels")
export class LabelsController {

    constructor(private labelsService: LabelsService){

    }

    @Get()
    getAllLabels() {

    }

    @Post()
    async createLabel(@Body() createLableDto: CreateLabelDto) {
        return await this.labelsService.createLabel(createLableDto);
    }
}
