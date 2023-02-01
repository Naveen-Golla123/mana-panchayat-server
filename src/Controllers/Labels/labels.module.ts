import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Labels } from "src/Entities/Labels.entity";
import { LabelsController } from "./labels.controller";
import { LabelsService } from "./labels.service";

@Module({
    imports:[TypeOrmModule.forFeature([Labels])],
    controllers:[LabelsController],
    providers: [LabelsService]
})
export class LabelsModule {}