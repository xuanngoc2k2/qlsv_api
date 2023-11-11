import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  // @Get()
  // getall() {
  //   return this.courseService.getall();
  // }
  @Get()
  findAll(@Query() { search }) {
    return this.courseService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return await this.courseService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  // @Get('sinh-vien/:id')
  // getAllHp(@Param('id') id: number) {
  //   return this.courseService.getallHp(id);
  // }
}
