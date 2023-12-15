import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nganh } from "./entities/nganh.entity";
import { NganhController } from "./nganh.controller";
import { NganhService } from "./nganh.service";

@Module({
    imports: [TypeOrmModule.forFeature([Nganh])],
    controllers: [NganhController],
    providers: [NganhService],
})
export class NganhModule { }
