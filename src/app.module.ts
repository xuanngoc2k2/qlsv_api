import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HocphanModule } from './hocphan/hocphan.module';
import { TaikhoanModule } from './taikhoan/taikhoan.module';
import { SinhvienModule } from './sinhvien/sinhvien.module';
import { LopModule } from './lop/lop.module';
import { MonModule } from './mon/mon.module';
import { MonnganhModule } from './monnganh/monnganh.module';
import { NganhModule } from './nganh/nganh.module';
import { KhoaModule } from './khoa/khoa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'qldiemsv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NganhModule,
    MonnganhModule,
    MonModule,
    LopModule,
    KhoaModule,
    SinhvienModule,
    TaikhoanModule,
    HocphanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
