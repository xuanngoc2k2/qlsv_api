import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async loginCredentials(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('/sinh-vien')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createSv(createUserDto);
  }
}
