import { CreateHocphanDto } from './dto/create-hocphan.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HocphanService } from './hocphan.service';

@Controller('hocphan')
export class HocphanController {
  constructor(private readonly hocphanService: HocphanService) { }

  @Get()
  async getAllHP() {
    return this.hocphanService.getAllhp();
  }
}
