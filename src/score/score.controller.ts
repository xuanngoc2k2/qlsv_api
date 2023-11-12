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
  svGetDiem(@Param('id') id: number) {
    return this.scoreService.svGetDiem(id);
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

  @Get('/admin/:course_id/:student_name')
  adminGetDiemCourseSV(@Param('course_id') course_id: number, @Param('student_name') student_name: string) {
    return this.scoreService.adminGetDiemCourseSV(course_id, student_name);
  }

  @Get('/student/count/:id')
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

  @Post('/course/:id')
  updateDiemSv(@Param('id') id: number, @Body() UpdateScoreDto: UpdateScoreDto) {
    return this.scoreService.updateDiemSV(id, UpdateScoreDto);
  }

  @Get('/count/:id')
  async CountDiem(@Param('id') id: number): Promise<Object> {
    const data = await this.scoreService.adminCountDiemSv(id);
    return data;
  }

  @Get('/gv/count/:id')
  async gvCountDiem(@Param('id') id: number): Promise<Object> {
    const data = await this.scoreService.adminCountDiemmh(id);
    return data;
  }

  @Get('/ki/:id')
  getKi(@Param('id') id: number) {
    const data = this.scoreService.getAllkiSV(id);
    // console.log(data)
    return data;
  }

  @Get('/ki/:id/:kihoc')
  getDiemKi(@Param('id') id: number, @Param('kihoc') kihoc: number) {
    const data = this.scoreService.svGetDiemKi(id, kihoc);
    console.log(data)
    return data;
  }

  @Get('/sinhvien/:id')
  getAllhpsv(@Param('id') id: number) {
    const data = this.scoreService.getAllhp(id);
    console.log(data)
    return data;
  }
}
