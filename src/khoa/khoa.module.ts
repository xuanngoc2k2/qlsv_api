import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Khoa } from "./entities/khoa.entity";
import { KhoaService } from "./khoa.service";
import { KhoaController } from "./khoa.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Khoa])],
    controllers: [KhoaController],
    providers: [KhoaService],
})
export class KhoaModule { }
