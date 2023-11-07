import { Module } from '@nestjs/common';
import { HocphanService } from './hocphan.service';
import { HocphanController } from './hocphan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hocphan])],
  controllers: [HocphanController],
  providers: [HocphanService],
})
export class HocphanModule {}
