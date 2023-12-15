import { Sinhvien } from "src/sinhvien/entities/sinhvien.entity";
import { SinhvienHocphan } from "src/sinhvienhocphan/entities/sinhvienhocphan.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SinhvienKi {
    @PrimaryColumn()
    masv: string;

    @PrimaryColumn()
    kithu: number;

    @Column({ nullable: false })
    tinhtranghp: string;

    @Column({ nullable: false })
    tbc: number;

    @ManyToOne(() => Sinhvien, (sv) => sv.svk)
    @JoinColumn({ name: 'masv' })
    sv: Sinhvien;

    @OneToMany(() => SinhvienHocphan, (svhp) => svhp.svk)
    svhp: SinhvienHocphan[]
}
