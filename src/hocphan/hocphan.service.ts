import { InjectRepository } from '@nestjs/typeorm';
import { Hocphan } from './entities/hocphan.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { And, Repository } from 'typeorm';
import { CreateHocphanDto } from './dto/hocphan.dto';
import { Mon } from 'src/mon/entities/mon.entity';

@Injectable()
export class HocphanService {
  constructor(
    @InjectRepository(Hocphan)
    private readonly hocphanRepo: Repository<Hocphan>,
    @InjectRepository(Mon)
    private readonly monRepo: Repository<Mon>,
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
      tenhp: hp.tenhp,
      thutu: hp.thutu,
      nam: hp.nam,
      hocki: hp.hocki,
      diadiemhoc: hp.diadiemhoc,
      soluong: hp.soluong,
      gvphutrach: hp.gvphutrach,
      tenmonhoc: hp.mon.tenmonhoc,
      tutiet: hp.tutiet,
      dentiet: hp.dentiet,
      sotc: hp.mon.sotc,
      mota: hp.mon.mota,
      mahocphan: hp.mahocphan
    }));

    return formattedHps;
  }

  async createHocphan(createHocphanDto: CreateHocphanDto)
    : Promise<Hocphan> {
    // console.log(createHocphanDto);
    let mon = await this.monRepo.findOne({
      where: {
        mamonhoc: createHocphanDto.mamonhoc,
      }
    });
    // console.log(mon);
    if (!mon) {
      mon = await this.monRepo.create({
        mamonhoc: createHocphanDto.mamonhoc,
        tenmonhoc: createHocphanDto.tenmonhoc,
        mota: createHocphanDto.motamonhoc,
        sotc: createHocphanDto.sotc
      })
      this.monRepo.save(mon);
    }
    const hp = await this.hocphanRepo.findOne({
      where: {
        mahocphan: createHocphanDto.mamonhoc + createHocphanDto.thutu
      }
    })
    console.log(hp)
    if (!hp) {
      const hocphan = this.hocphanRepo.create({
        mahocphan: createHocphanDto.mamonhoc + createHocphanDto.thutu,
        mon: mon,
        ...createHocphanDto,

      });
      return this.hocphanRepo.save(hocphan);
    }
    else {
      throw new BadRequestException('Học phần đã tồn tại');
    }
  }
  async delete(hp, thutu) {
    return await this.hocphanRepo.delete({
      mahocphan: hp,
      thutu: thutu
    });
  }

}
