import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreDto } from './create-score.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateScoreDto {
    course_id?: number

    user_id?: number
    @IsNumber()
    middle: number;

    @IsNumber()
    final: number;

    @IsString()
    email: string;

    @IsString()
    classN: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}
