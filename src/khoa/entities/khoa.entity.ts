import { Lop } from "src/lop/entities/lop.entity";
import { Nganh } from "src/nganh/entities/nganh.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Khoa {
    @PrimaryGeneratedColumn()
    makhoa: number;

    @Column({ nullable: false })
    tenkhoa: string;

    @Column({ nullable: true })
    mota: string;

    @OneToMany(() => Nganh, (nganh) => nganh.khoa)
    nganhs: Nganh[];

    @OneToMany(() => Lop, (lop) => lop.khoa)
    lops: Lop[];
}
