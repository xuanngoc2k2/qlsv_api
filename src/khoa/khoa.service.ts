import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Khoa } from "./entities/khoa.entity";
import { Repository } from "typeorm";

@Injectable()
export class KhoaService {
    constructor(
        @InjectRepository(Khoa)
        private readonly khoaRepo: Repository<Khoa>,
    ) { }
    getAllKhoa() {
        const khoas = this.khoaRepo
            .createQueryBuilder('Khoa')
            .getMany();
        //     .getOne();
        if (!khoas) {
            throw new NotFoundException('Lop not found');
        }
        return khoas;
    }
}
