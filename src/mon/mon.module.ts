import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mon } from "./entities/mon.entity";
import { MonController } from "./mon.controller";
import { MonService } from "./mon.service";

@Module({
    imports: [TypeOrmModule.forFeature([Mon])],
    controllers: [MonController],
    providers: [MonService],
})
export class MonModule { }
