import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HocphanService } from './hocphan.service';
import { CreateHocphanDto } from './dto/hocphan.dto';

@Controller('hocphan')
export class HocphanController {
  constructor(private readonly hocphanService: HocphanService) { }

  @Get()
  async getAllHP() {
    return this.hocphanService.getAllhp();
  }
  @Post()
  createHocphan(@Body() createHocphanDto: CreateHocphanDto) {
    return this.hocphanService.createHocphan(createHocphanDto);
  }

  @Delete(':mahp/:thutu')
  deletehp(@Param('mahp') hp: string, @Param('thutu') thutu: number) {
    return this.hocphanService.delete(hp, thutu)
  }
}
