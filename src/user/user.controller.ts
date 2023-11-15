import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LoginDto, CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Get()
  // async getAllSv() {
  //   return await this.userService.getAll();
  // }

  // @Get('/:student_name')
  // async getSVbyName(@Param('student_name') student_name: string) {
  //   return await this.userService.getbyName(student_name);
  // }
  @Get()
  async getAllSv(@Query() query: any) {
    return await this.userService.getAll(query.search);
  }

  @Get('/masv/:msv')
  async getSVbyMsv(@Param('msv') msv: string) {
    return await this.userService.getSvbyMsv(msv);
  }

  // @Get()
  // async getSVbyName(@Body() student_name: string) {
  //   return await this.userService.getbyName(student_name);
  // }

  @Post('/login')
  async loginCredentials(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.userService.login(loginDto);
    res.cookie('user', user);
    return res.send(user);
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    res.cookie('user', '', {
      expires: new Date(0),
      httpOnly: true,
    });
    res.send(true);
  }

  @Post('/sinh-vien')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createSv(createUserDto);
  }

  @Patch('/:msv')
  patchSv(@Body() createUserDto: CreateUserDto) {
    return this.userService.patchSv(createUserDto);
  }

  @Delete('/:id')
  deleteSv(@Param('id') id: number) {
    return this.userService.deleteSv(id);
  }
}
