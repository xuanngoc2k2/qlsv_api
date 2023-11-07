import { PartialType } from '@nestjs/mapped-types';
import { CreateHocphanDto } from './create-hocphan.dto';

export class UpdateHocphanDto extends PartialType(CreateHocphanDto) {}
