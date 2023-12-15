import { Sinhvien } from "src/sinhvien/entities/sinhvien.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Taikhoan {
    @PrimaryColumn()
    masv: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: 2 })
    role: number;

    @OneToMany(() => Sinhvien, (sv) => sv.taikhoan)
    sv: Sinhvien[]
}
