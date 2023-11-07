import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsNumber()
  course_id: number;

  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsNumber()
  middle: number;

  @IsNotEmpty()
  @IsNumber()
  final: number;

  @IsNotEmpty()
  @IsNumber()
  updateAt: Date;
}
