import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateScoreDto } from './dto/update-score.dto';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) { }

  @Get('/student/:id')
  svGetDiem(@Param() id: string) {
    return this.scoreService.svGetDiem(+id);
  }

  // @Get('/admin')
  // adminGetDiem(@Query() query) {
  //   const { student_id, class_id } = query;
  //   return this.scoreService.adminGetDiem(+student_id, +class_id);
  // }

  @Get('/admin/:course_id')
  adminGetDiemCourse(@Param('course_id') course_id: number) {
    return this.scoreService.adminGetDiemCourse(course_id);
  }

  @Get('student/count/:id')
  async GetTKeDiem(@Param('id') id: number) {
    return await this.scoreService.demDiem(id);
  }
  // @Patch()
  // update(@Body() updateScoreDto: UpdateScoreDto) {
  //   return this.scoreService.update(updateScoreDto);
  // }

  @Post('/admin')
  uploadCSV(@Body() updateScoreDto: UpdateScoreDto[]) {
    return this.scoreService.uploadCSV(updateScoreDto);
  }
}
