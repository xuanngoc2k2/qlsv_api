import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Monnganh } from "./entities/monnganh.entity";
import { MonnganhController } from "./monnganh.controller";
import { MonnganhService } from "./monnganh.service";

@Module({
    imports: [TypeOrmModule.forFeature([Monnganh])],
    controllers: [MonnganhController],
    providers: [MonnganhService],
})
export class MonnganhModule { }
