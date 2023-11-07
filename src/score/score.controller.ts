import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { query } from 'express';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('/student/:id')
  svGetDiem(@Param() id: string) {
    return this.scoreService.svGetDiem(+id);
  }

  @Get('/admin')
  adminGetDiem(@Query() query) {
    const { student_id, class_id } = query;
    return this.scoreService.adminGetDiem(+student_id, +class_id);
  }

  @Patch()
  update(@Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(updateScoreDto);
  }

  @Post('/admin')
  uploadCSV(@Body() updateScoreDto: UpdateScoreDto[]) {
    return this.scoreService.uploadCSV(updateScoreDto);
  }
}
