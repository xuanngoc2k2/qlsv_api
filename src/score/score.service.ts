import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Score)
    private readonly scoreRepo: Repository<Score>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async svGetDiem(id: number) {
    // console.log(id);
    // const scores = await this.scoreRepo
    //   .createQueryBuilder('Score')
    //   .leftJoinAndSelect('Score.course', 'Course')
    //   .leftJoinAndSelect('Score.user', 'User')
    //   .where('Score.user.id = :userId', { userId: id })
    //   .select(['Score', 'Course'])
    //   .getMany()
    // console.log(scores);
    const scores = await this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.user', 'User')
      .leftJoinAndSelect('Score.course', 'Course')
      .where('Score.user_id = :id', { id })
      .getMany();
    let userInfo = {};
    const data = scores.map((element) => {
      const { user, course, ...tmp } = element;
      delete tmp.id;
      delete tmp.updateAt;
      delete user.password;
      // delete user.id;
      delete user.role;
      console.log(user);
      userInfo = user;
      return {
        // courseId: course.id,
        name: course.name,
        soTc: course.so_tc,
        ki: course.hocKi,
        nam: course.year,
        ...tmp,
      };
    });
    // const user = 
    return {
      userInfo,
      data
    }
    // return scores;
  }


  convertToLetterGrade(score) {
    if (score >= 9.5) {
      return 'A+';
    } else if (score >= 8.5) {
      return 'A';
    } else if (score >= 8) {
      return 'B+';
    } else if (score >= 7) {
      return 'B';
    } else if (score >= 6) {
      return 'C+';
    } else if (score >= 5.5) {
      return 'C';
    } else if (score >= 5) {
      return 'D+';
    } else if (score >= 4) {
      return 'D';
    } else {
      return 'F';
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
      'A+': 0,
      'A': 0,
      'B+': 0,
      'B': 0,
      'C+': 0,
      'C': 0,
      'D+': 0,
      'D': 0,
      'F': 0
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
      .where('Score.course.id = :courseId', { courseId: id })
      .select(['Score', 'User.firstName', 'User.lastName', 'User.class', 'User.email'])
      .getMany();

  }

  async adminGetDiemCourseSV(id: number, student_name: string) {
    return this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.course', 'Course')
      .leftJoinAndSelect('Score.user', 'User')
      .where('Score.course.id = :courseId and User.lastName LIKE :studentName', { courseId: id, studentName: `%${student_name}%` })
      .select(['Score', 'User.firstName', 'User.lastName', 'User.class', 'User.email'])
      .getMany();
  }
  async adminCountDiemmh(id: number) {
    try {
      const scores = await this.scoreRepo
        .createQueryBuilder('Score')
        .leftJoinAndSelect('Score.course', 'Course')
        .where('Score.course.id = :courseId', { courseId: id })
        .select(['Score.total'])
        .getMany();


      const count = {
        'A+': 0,
        'A': 0,
        'B+': 0,
        'B': 0,
        'C+': 0,
        'C': 0,
        'D+': 0,
        'D': 0,
        'F': 0
      };
      console.log(scores)
      for (const score of scores) {
        const letterGrades = this.convertToLetterGrade(score.total);
        // const stc = score.course.so_tc;
        if (count.hasOwnProperty(letterGrades)) {
          count[letterGrades]++;
        }
      }
      console.log(count)
      return count;
    } catch (error) {
      console.error(error);
      throw new Error('Error counting grades.');
    }
  }
  async adminCountDiemSv(id: number) {
    try {
      const scores = await this.scoreRepo
        .createQueryBuilder('Score')
        .leftJoinAndSelect('Score.course', 'Course')
        .leftJoinAndSelect('Score.user', 'User')
        .where('Score.user.id = :userId', { userId: id })
        .select(['Score.total', 'Course.so_tc'])
        .getMany();


      const count = {
        'A+': 0,
        'A': 0,
        'B+': 0,
        'B': 0,
        'C+': 0,
        'C': 0,
        'D+': 0,
        'D': 0,
        'F': 0
      };
      console.log(scores)
      for (const score of scores) {
        const letterGrades = this.convertToLetterGrade(score.total);
        const stc = score.course.so_tc;
        if (count.hasOwnProperty(letterGrades)) {
          count[letterGrades] += Number(stc);
        }
      }
      console.log(count)
      return count;
    } catch (error) {
      console.error(error);
      throw new Error('Error counting grades.');
    }
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

  async updateDiemSV(id_course: number, updateScoreDto: UpdateScoreDto) {
    const existingUser = await this.userRepo.findOne({
      where: {
        email: updateScoreDto.email,
      },
    });

    if (existingUser) {
      const score = await this.scoreRepo
        .createQueryBuilder('Score')
        .leftJoinAndSelect('Score.user', 'User')
        .leftJoinAndSelect('Score.course', 'Course')
        .where('Score.course.id = :courseId and Score.user.id = :userId', { courseId: id_course, userId: existingUser.id })
        .getOne();
      if (score) {
        const { final, middle } = updateScoreDto;
        const scoreUpdate = {
          final,
          middle
        }
        console.log('Update điểm đã có')
        return this.scoreRepo.update(score.id, scoreUpdate);
      }
      else {
        console.log('Update điểm chưa có')
        const course = await this.courseRepo.findOne({
          where: {
            id: id_course
          }
        });

        if (course) {
          const score = await this.scoreRepo.save({
            user: existingUser,
            course: course,
            ...updateScoreDto
          });
          return score;
        } else {
          console.log("Course not found");
          return BadRequestException;
        }
      }
    }
    else {
      const { firstName, lastName, email, classN } = updateScoreDto;
      const userCreate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        class: classN
      }
      await this.userRepo.save(userCreate);
      console.log('Gọi Update điểm chưa có');
      return this.updateDiemSV(id_course, updateScoreDto);
    }
  }
  async getAllkiSV(id: number) {
    const data = await this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.course', 'Course')
      .where('Score.user.id = :userId', { userId: id })
      .select('DISTINCT Course.hocKi', 'hocKi') // Use select for distinct
      .getRawMany();

    const kiValues = data.map((item) => item.hocKi);
    // console.log(kiValues);
    return kiValues;
  }

  async svGetDiemKi(id: number, ki: number) {
    const scores = await this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.user', 'User')
      .leftJoinAndSelect('Score.course', 'Course')
      .where('Score.user_id = :id and Course.isDel = 0 and Course.hocKi = :ki', { id, ki })
      .getMany();
    const data = scores.map((element) => {
      const { user, course, ...tmp } = element;
      delete tmp.id;
      delete tmp.updateAt;
      return {
        courseId: course.id,
        name: course.name,
        soTc: course.so_tc,
        ki: course.hocKi,
        nam: course.year,
        ...tmp,
      };
    });
    return data
  }

  async getAllhp(id: number) {
    const scores = await this.scoreRepo
      .createQueryBuilder('Score')
      .leftJoinAndSelect('Score.user', 'User')
      .leftJoinAndSelect('Score.course', 'Course')
      .where('Score.user_id = :id and Course.isDel = 0', { id })
      .getMany();
    const data = scores.map((element) => {
      const { user, course, ...tmp } = element;
      const time = `${course.date} từ tiết ${course.from} đến tiết ${course.to}`;
      return {
        name: course.name,
        gv: course.gv,
        so_tc: course.so_tc,
        time: time,
        address: course.address,
        hocki: course.hocKi,
        year: course.year,
        ss: course.totalSV
      };
    });
    return data
  }
}
