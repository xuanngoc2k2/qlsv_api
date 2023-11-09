import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      role: 2,
    });
  }

  async getAll() {
    return await this.userRepo.find()
  }

  async getbyName(student_name: string) {
    return await this.userRepo
      .createQueryBuilder('User')
      .where('User.lastName LIKE :studentName', { studentName: `%${student_name}%` })
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
}
