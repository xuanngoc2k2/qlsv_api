import { Controller, Get } from "@nestjs/common";
import { KhoaService } from "./khoa.service";

@Controller('khoa')
export class KhoaController {
    constructor(private readonly khoaService: KhoaService) { }

    @Get()
    async getAllKhoa() {
        return await this.khoaService.getAllKhoa();
    }
}
