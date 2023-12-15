import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sinhvien } from "./entities/sinhvien.entity";
import { SinhvienController } from "./sinhvien.controller";
import { SinhvienService } from "./sinhvien.service";

@Module({
    imports: [TypeOrmModule.forFeature([Sinhvien])],
    controllers: [SinhvienController],
    providers: [SinhvienService],
})
export class SinhvienModule { }
