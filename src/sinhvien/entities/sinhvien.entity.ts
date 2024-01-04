import { Lop } from "src/lop/entities/lop.entity";
import { SinhvienKi } from "src/sinhvienki/entities/sinhvienki.entity";
import { Taikhoan } from "src/taikhoan/entities/taikhoan.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sinhvien {
    @PrimaryColumn()
    masv: string;

    @Column()
    tensv: string;

    @Column()
    ngaysinh: Date;

    @Column()
    gioitinh: number;

    @Column({ nullable: true })
    sdt: string;

    @Column({ nullable: true })
    email: string;

    @Column('double', { nullable: true })
    gpa: number;

    @ManyToOne(() => Taikhoan, (tk) => tk.sv)
    @JoinColumn({ name: 'masv' })
    taikhoan: Taikhoan;

    @OneToMany(() => SinhvienKi, (svk) => svk.sv)
    svk: Sinhvien[]

    @ManyToOne(() => Lop, (lop) => lop.svs)
    @JoinColumn({ name: 'malop', referencedColumnName: 'malop' })
    lop: Lop;
}
