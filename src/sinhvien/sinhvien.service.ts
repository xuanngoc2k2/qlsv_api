import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sinhvien } from "./entities/sinhvien.entity";
import { Repository } from "typeorm";
import { Taikhoan } from "src/taikhoan/entities/taikhoan.entity";
import { CreateSinhvienDto } from "./dto/sinhvien.dto";
import { parse } from 'date-fns';
import { Lop } from "src/lop/entities/lop.entity";

@Injectable()
export class SinhvienService {
    constructor(
        @InjectRepository(Sinhvien)
        private readonly sinhvienRepo: Repository<Sinhvien>,
        @InjectRepository(Taikhoan)
        private readonly taikhoan: Repository<Taikhoan>,
        @InjectRepository(Taikhoan)
        private readonly lopRepo: Repository<Lop>,
    ) { }

    async getStudentInformation(masv: string): Promise<Object> {
        const student = await this.sinhvienRepo
            .createQueryBuilder('Sinhvien')
            .leftJoinAndSelect('Sinhvien.lop', 'Lop')
            .leftJoinAndSelect('Lop.khoa', 'Khoa')
            .where('Sinhvien.masv = :masv', { masv })
            .getOne();
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        const formattedStudent = {
            masv: student.masv,
            tensv: student.tensv,
            ngaysinh: student.ngaysinh,
            gioitinh: student.gioitinh,
            sdt: student.sdt,
            email: student.email,
            gpa: student.gpa,
            lop: student.lop.tenlop,
            khoa: student.lop.khoa.tenkhoa,
        };

        return formattedStudent;
    }

    async getAllsv() {
        const students = await this.sinhvienRepo
            .createQueryBuilder('Sinhvien')
            .leftJoinAndSelect('Sinhvien.lop', 'Lop')
            .leftJoinAndSelect('Lop.khoa', 'Khoa')
            .getMany();

        if (!students || students.length === 0) {
            throw new NotFoundException('Students not found');
        }

        // Format each student in the array
        const formattedStudents = students.map(student => ({
            masv: student.masv,
            tensv: student.tensv,
            ngaysinh: student.ngaysinh ? new Date(student.ngaysinh).toLocaleDateString() : null,
            gioitinh: student.gioitinh,
            sdt: student.sdt,
            email: student.email,
            gpa: student.gpa,
            lop: student.lop.tenlop,
            khoa: student.lop.khoa.tenkhoa
        }));

        return formattedStudents;
    }

    async createSv(createSinhvienDto: CreateSinhvienDto) {
        const { masv, tensv, ngaysinh, gioitinh, sdt, email, gpa, lop } = createSinhvienDto;
        const ns = new Date(ngaysinh);
        this.taikhoan.save({
            masv,
            password: ngaysinh.toString(),
        });
        console.log(createSinhvienDto);
        const student = this.sinhvienRepo.create({
            masv,
            tensv,
            ngaysinh: ns,
            gioitinh,
            sdt,
            email,
            gpa: !gpa ? null : gpa,
            lop: { malop: createSinhvienDto.lop },
        });

        return await this.sinhvienRepo.save(student);
    }
    async deleteSv(masv) {
        console.log(masv);
        return await this.sinhvienRepo.delete(masv);
    }
}
