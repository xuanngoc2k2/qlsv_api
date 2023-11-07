import { CreateHocphanDto } from './dto/create-hocphan.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HocphanService } from './hocphan.service';

@Controller('hocphan')
export class HocphanController {
  constructor(private readonly hocphanService: HocphanService) {}

  @Get(':id')
  findAll(@Param() id: string) {
    return this.hocphanService.getListStudent(+id);
  }

  @Post()
  studentRegister(@Body() registerHPDto: CreateHocphanDto) {
    return this.hocphanService.studentRegister(registerHPDto);
  }
}
