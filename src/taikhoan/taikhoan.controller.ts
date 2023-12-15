import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { TaiKhoanService } from "./taikhoan.service";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";

@Controller('taikhoan')
export class TaiKhoanController {
    constructor(private readonly taikhoanService: TaiKhoanService) { }

    @Post('/login')
    async loginCredentials(@Body() loginDto: LoginDto, @Res() res: Response) {
        const user = await this.taikhoanService.login(loginDto);
        if (user) {
            res.cookie('user', user);
            return res.send(user);
        }
        return null;
    }

    @Get('/logout')
    async logout(@Res() res: Response) {
        res.cookie('user', '', {
            expires: new Date(0),
            httpOnly: true,
        });
        res.send(true);
    }
}
