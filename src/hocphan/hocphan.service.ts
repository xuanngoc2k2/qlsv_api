import { InjectRepository } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateHocphanDto } from './dto/create-hocphan.dto';

@Injectable()
export class HocphanService {
  constructor(
    @InjectRepository(Hocphan)
    private readonly hocphanRepo: Repository<Hocphan>,
  ) {}
  async getListStudent(id: number) {
    return await this.hocphanRepo.find({
      where: {
        course_id: id,
      },
    });
  }

  async studentRegister(data: CreateHocphanDto) {
    const { course_id, student_id } = data;
    const hp = await this.hocphanRepo.find({
      where: {
        course_id,
        student_id,
      },
    });

    if (hp) throw new BadRequestException('Ban đã đăng kí môn học này r');
    return await this.hocphanRepo.save({ course_id, student_id });
  }
}
