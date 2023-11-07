import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty() // Bắt buộc phải gửi lên
  @MaxLength(50) // Tối đa 50 ký tự
  name: string;

  @IsNotEmpty()
  @MaxLength(50)
  gv_id: string;

  @IsNotEmpty()
  @IsNumber()
  so_tc: string;

  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  hocKi: string;

  @IsNotEmpty()
  @IsNumber()
  totalSV: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
