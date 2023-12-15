import { Controller, Get, Param } from "@nestjs/common";
import { SinhvienService } from "./sinhvien.service";

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
}
