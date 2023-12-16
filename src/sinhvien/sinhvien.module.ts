import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sinhvien } from "./entities/sinhvien.entity";
import { SinhvienController } from "./sinhvien.controller";
import { SinhvienService } from "./sinhvien.service";
import { Taikhoan } from "src/taikhoan/entities/taikhoan.entity";
import { Lop } from "src/lop/entities/lop.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Sinhvien, Taikhoan, Lop])],
    controllers: [SinhvienController],
    providers: [SinhvienService],
})
export class SinhvienModule { }
