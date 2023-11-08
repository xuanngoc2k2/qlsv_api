import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
  ) { }

  async svGetDiem(id: number) {
    return await this.scoreRepo
      .createQueryBuilder('score')
      .leftJoin('score.sv', 'sv')
      .select(['score.total'])
      .where('sv.id = :id', { id })
  }


  convertToLetterGrade(score) {
    if (score >= 9) {
      return 'A';
    } else if (score >= 8) {
      return 'B';
    } else if (score >= 7) {
      return 'C';
    } else {
      return 'D';
    }
  }

  async demDiem(id: number) {
    const scores = this.scoreRepo
      .createQueryBuilder('score')
      .leftJoin('score.sv', 'sv')
      .select(['score.total'])
      .where('sv.id = :id', { id })
      .getMany();

    const scoreValues = (await scores).map(score => score.total);

    const letterGrades = scoreValues.map(score => this.convertToLetterGrade(score));
    const count = {
      'A': 0,
      'B': 0,
      'C': 0,
      'D': 0
    };
    for (const grade of letterGrades) {
      if (count.hasOwnProperty(grade)) {
        count[grade]++;
      }
    }
    return count;
  }

  // async adminGetDiem(student_id?: number, class_id?: number) {
  //   if (!student_id && !class_id) throw new BadRequestException();
  //   const where = student_id ? { student_id } : { class_id };
  //   return await this.scoreRepo.find({
  //     where,
  //   });
  // }

  async adminGetDiemCourse(id: number) {
    return this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.course', 'Course')
      .leftJoinAndSelect('Score.user', 'User')
      .where('Score.course.id = :courseId', { courseId: 1 })
      .select(['Score', 'User.firstName', 'User.lastName', 'User.class', 'User.email'])
      .getMany();

  }


  // async update(updateScoreDto: UpdateScoreDto) {
  //   const { student_id, course_id } = updateScoreDto;
  //   const score = await this.scoreRepo.find({
  //     where: {
  //       student_id,
  //       course,
  //     },
  //   });

  //   if (score) return await this.scoreRepo.update(score[0].id, updateScoreDto);
  //   return await this.scoreRepo.save(updateScoreDto);
  // }

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
