import { Controller, Get, Param } from "@nestjs/common";
import { LopService } from "./lop.service";

@Controller('lop')
export class LopController {
    constructor(private readonly lopService: LopService) { }
    @Get(':makhoa')
    async getAllLop(@Param('makhoa') makhoa: number) {
        return this.lopService.getAllLop(makhoa);
    }
}
