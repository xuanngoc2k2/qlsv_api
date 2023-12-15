import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Taikhoan } from "./entities/taikhoan.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class TaiKhoanService {
    constructor(
        @InjectRepository(Taikhoan)
        private readonly taikhoanRepo: Repository<Taikhoan>,
    ) { }

    async login(login) {
        const { masv, password } = login;
        const user = await this.taikhoanRepo.findOne({
            where: {
                masv: masv,
                password: password,
            },
        });
        if (!user) throw new UnauthorizedException();
        // const data = await this.taikhoanRepo
        //     .createQueryBuilder('TaiKhoan')
        //     .leftJoinAndSelect('TaiKhoan.sv', 'Sinhvien')
        //     .where('TaiKhoan.masv = :masv', { masv: user.masv })
        //     .getMany();

        // // Log the retrieved data
        // console.log(data);
        // if (data.length > 0 && data[0].sv.length > 0) {
        //     const sinhvienInfo = data[0].sv[0]; // Accessing the first Sinhvien entity
        //     console.log('Sinhvien Information:', sinhvienInfo);
        //     return sinhvienInfo;
        // }

        delete user.password;
        return user;
    }

}
