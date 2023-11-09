import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoginDto, CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllSv() {
    return await this.userService.getAll();
  }

  @Get('/:student_name')
  async getSVbyName(@Param('student_name') student_name: string) {
    return await this.userService.getbyName(student_name);
  }

  // @Get()
  // async getSVbyName(@Body() student_name: string) {
  //   return await this.userService.getbyName(student_name);
  // }

  @Post('/login')
  async loginCredentials(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('/sinh-vien')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createSv(createUserDto);
  }

  @Patch('/:msv')
  patchSv(@Body() createUserDto: CreateUserDto) {
    return this.userService.patchSv(createUserDto);
  }
}
