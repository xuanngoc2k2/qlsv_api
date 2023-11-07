import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) {}

  async svGetDiem(id: number) {
    return await this.scoreRepo.find({
      where: {
        student_id: id,
      },
    });
  }

  async adminGetDiem(student_id?: number, class_id?: number) {
    if (!student_id && !class_id) throw new BadRequestException();
    const where = student_id ? { student_id } : { class_id };
    return await this.scoreRepo.find({
      where,
    });
  }

  async update(updateScoreDto: UpdateScoreDto) {
    const { student_id, course_id } = updateScoreDto;
    const score = await this.scoreRepo.find({
      where: {
        student_id,
        course_id,
      },
    });

    if (score) return await this.scoreRepo.update(score[0].id, updateScoreDto);
    return await this.scoreRepo.save(updateScoreDto);
  }

  async uploadCSV(updateScoresDto: UpdateScoreDto[]) {
    try {
      for (const item of updateScoresDto) {
        await this.scoreRepo.save(item);
      }
      return true;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
