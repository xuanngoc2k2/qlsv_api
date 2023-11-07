import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateHocphanDto {
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @IsNotEmpty()
  @IsNumber()
  course_id: number;
}
