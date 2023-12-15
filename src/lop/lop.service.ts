import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lop } from "./entities/lop.entity";

@Injectable()
export class LopService {
    constructor(
        @InjectRepository(Lop)
        private readonly lopRepo: Repository<Lop>,
    ) { }
    // this.sinhvienRepo
    //     .createQueryBuilder('Sinhvien')
    //     .leftJoinAndSelect('Sinhvien.lop', 'Lop')
    //     .leftJoinAndSelect('Lop.khoa', 'Khoa')
    //     .where('Sinhvien.masv = :masv', { masv })
    //     .getOne();
    // if (!student) {
    //     throw new NotFoundException('Student not found');
    // }
    getAllLop(makhoa) {
        console.log(makhoa);
        const lops = this.lopRepo
            .createQueryBuilder('Lop')
            .where('Lop.makhoa = :makhoa', { makhoa })
            .getMany();
        //     .getOne();
        if (!lops) {
            throw new NotFoundException('Lop not found');
        }
        return lops;
    }
}
