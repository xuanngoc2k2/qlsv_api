import { Body, Controller, Get, Post } from "@nestjs/common";
import { MonService } from "./mon.service";
import { MonDtoCreate } from "./dto/mon.dto";

@Controller('mon')
export class MonController {
    constructor(private readonly monService: MonService) { }
    @Get()
    async getAllMon() {
        return await this.monService.findAll();
    }

    @Post()
    async createMon(@Body() mondto: MonDtoCreate) {
        return this.monService.createMon(mondto);
    }
}
