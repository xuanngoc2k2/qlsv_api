import { Khoa } from "src/khoa/entities/khoa.entity";
import { Lop } from "src/lop/entities/lop.entity";
import { Monnganh } from "src/monnganh/entities/monnganh.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nganh {
    @PrimaryGeneratedColumn()
    manganh: number;

    @Column({ nullable: false })
    tennganh: string;

    @Column({ nullable: true })
    mota: number;

    @ManyToOne(() => Khoa, (khoa) => khoa.nganhs)
    @JoinColumn({ name: 'makhoa' }) // Định nghĩa tên cột trong database cho mối quan hệ
    khoa: Khoa;

    @OneToMany(() => Monnganh, (monnganh) => monnganh.nganh)
    monnganh: Monnganh[];

    @OneToMany(() => Lop, (lop) => lop.nganh)
    lop: Lop[];
}
