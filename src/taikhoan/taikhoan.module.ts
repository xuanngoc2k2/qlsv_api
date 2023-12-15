import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Taikhoan } from "./entities/taikhoan.entity";
import { TaiKhoanController } from "./taikhoan.controller";
import { JwtService } from "@nestjs/jwt";
import { TaiKhoanService } from "./taikhoan.service";
import { Sinhvien } from "src/sinhvien/entities/sinhvien.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Taikhoan, Sinhvien])],
    controllers: [TaiKhoanController],
    providers: [TaiKhoanService, JwtService],
})
export class TaikhoanModule { }
