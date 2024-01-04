import { Module } from '@nestjs/common';
import { HocphanService } from './hocphan.service';
import { HocphanController } from './hocphan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';
import { Mon } from 'src/mon/entities/mon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hocphan, Mon])],
  controllers: [HocphanController],
  providers: [HocphanService],
})
export class HocphanModule { }
