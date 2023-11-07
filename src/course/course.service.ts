import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseRepo.save(createCourseDto);
  }

  async findAll(search: string) {
    return await this.courseRepo.findBy({ name: ILike(`%${search}%`) });
  }

  async findOne(id: number) {
    return await this.courseRepo.findOne({ where: { id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepo.update(id, updateCourseDto);
  }

  async remove(id: number) {
    return await this.courseRepo.delete(id);
  }
}
