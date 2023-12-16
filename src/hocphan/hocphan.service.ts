import { InjectRepository } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateHocphanDto } from './dto/create-hocphan.dto';

@Injectable()
export class HocphanService {
  constructor(
    @InjectRepository(Hocphan)
    private readonly hocphanRepo: Repository<Hocphan>,
  ) { }

  async getAllhp() {
    const hps = await this.hocphanRepo
      .createQueryBuilder('Hocphan')
      .leftJoinAndSelect('Hocphan.mon', 'Mon')
      .getMany();
    if (!hps || hps.length === 0) {
      throw new NotFoundException('Hps not found');
    }
    const formattedHps = hps.map(hp => ({
      mahocphan: hp.mahocphan,
      thutu: hp.thutu,
      nam: hp.nam,
      hocki: hp.hocki,
      diadiemhoc: hp.diadiemhoc,
      soluong: hp.soluong,
      gvphutrach: hp.gvphutrach,
      tenmonhoc: hp.mon.tenmonhoc,
      sotc: hp.mon.sotc,
      mota: hp.mon.mota
    }));

    return formattedHps;
  }
}
