import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Lop } from "./entities/lop.entity";
import { LopService } from "./lop.service";
import { LopController } from "./lop.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Lop])],
    controllers: [LopController],
    providers: [LopService],
})
export class LopModule { }
