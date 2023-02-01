import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "domain";
import { CreateLabelDto } from "../../dto/createLabelDto";
import { Labels } from "../../Entities/Labels.entity";
import { Repository } from "typeorm";

@Injectable()
export class LabelsService {

    constructor(@InjectRepository(Labels) private labelsRepository: Repository<Labels>){

    }

    async createLabel(createLableDto: CreateLabelDto){
        var label = new Labels();
        label.name = createLableDto.name;
        return await this.labelsRepository.save(label);
    }

    async getAllLabels(){
        return await this.labelsRepository.find();
    }

}