import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { LoginDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) throw new UnauthorizedException();
    delete user.password;
    return user;
  }

  async createSv(createUserDto: CreateUserDto) {
    return await this.userRepo.save({
      ...createUserDto,
    });
  }

  async updateSv(userU: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: userU.email
      }
    });

    if (user) {
      return await this.userRepo.update({ email: userU.email }, userU);
    }
    else {
      return BadRequestException
    }
  }

  async getSvbyMsv(msv: string) {
    const sv = await this.userRepo
      .createQueryBuilder('User')
      .where('User.email = :masv', { masv: msv })
      .getOne();
    if (sv) return sv;
    else return null;
  }
  // async getAll() {
  //   return await this.userRepo.find()
  // }

  // async getbyName(student_name: string) {
  //   return await this.userRepo
  //     .createQueryBuilder('User')
  //     .where('User.lastName LIKE :studentName', { studentName: `%${student_name}%` })
  //     .getMany();
  // }

  async getAll(search: string) {
    return await this.userRepo
      .createQueryBuilder('User')
      .where('User.role = :id', { id: 2 })
      .andWhere(
        new Brackets((qb) => {
          qb.where('User.lastName LIKE :studentName', {
            studentName: `%${search}%`,
          });
          // .orWhere('User.email LIKE :studentName', {
          //   studentName: `%${search}%`,
          // });
        }),
      )
      .getMany();
  }

  async patchSv(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      return await this.userRepo.update(existingUser.id, createUserDto);
    } else {
      return await this.userRepo.save(createUserDto);
    }
  }

  async deleteSv(id: number) {
    return await this.userRepo.delete(id);
  }
}
