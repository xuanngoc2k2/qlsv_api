import { Khoa } from "src/khoa/entities/khoa.entity";
import { Nganh } from "src/nganh/entities/nganh.entity";
import { Sinhvien } from "src/sinhvien/entities/sinhvien.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    malop: number;

    @Column({ nullable: false })
    tenlop: string;

    @Column({ nullable: false })
    siso: number;

    @ManyToOne(() => Khoa, (khoa) => khoa.lops)
    @JoinColumn({ name: 'makhoa' }) // Định nghĩa tên cột trong database cho mối quan hệ
    khoa: Khoa;

    @ManyToOne(() => Nganh, (nganh) => nganh.lop)
    @JoinColumn({ name: 'manganh' }) // Định nghĩa tên cột trong database cho mối quan hệ
    nganh: Nganh;

    @OneToMany(() => Sinhvien, (sv) => sv.lop)
    svs: Sinhvien[];
}
