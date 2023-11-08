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
    console.log(user)
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
}
