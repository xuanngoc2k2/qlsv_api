import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SinhvienService } from "./sinhvien.service";
import { Sinhvien } from "./entities/sinhvien.entity";
import { CreateSinhvienDto } from "./dto/sinhvien.dto";

@Controller('sinhvien')
export class SinhvienController {
    constructor(private readonly sinhvienService: SinhvienService) { }

    @Get(':masv')
    async getInfo(@Param('masv') masv: string) {
        return await this.sinhvienService.getStudentInformation(masv);
    }

    @Get()
    async getAllsv() {
        return await this.sinhvienService.getAllsv();
    }

    @Post()
    create(@Body() createSinhvienDto: CreateSinhvienDto) {
        return this.sinhvienService.createSv(createSinhvienDto);
    }
}
