import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class LoginDto {
    @IsNotEmpty()
    masv: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
