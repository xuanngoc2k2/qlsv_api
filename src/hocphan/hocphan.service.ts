import { InjectRepository } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateHocphanDto } from './dto/create-hocphan.dto';

@Injectable()
export class HocphanService {
  constructor(
    @InjectRepository(Hocphan)
    private readonly hocphanRepo: Repository<Hocphan>,
  ) { }
}
