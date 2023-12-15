import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sinhvien } from "./entities/sinhvien.entity";
import { Repository } from "typeorm";
import { Taikhoan } from "src/taikhoan/entities/taikhoan.entity";

@Injectable()
export class SinhvienService {
    constructor(
        @InjectRepository(Sinhvien)
        private readonly sinhvienRepo: Repository<Sinhvien>,
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

}
