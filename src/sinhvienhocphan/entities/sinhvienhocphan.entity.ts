import { Hocphan } from "src/hocphan/entities/hocphan.entity";
import { SinhvienKi } from "src/sinhvienki/entities/sinhvienki.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SinhvienHocphan {
    @PrimaryColumn()
    masv: string;

    @PrimaryColumn()
    mahocphan: number;

    @PrimaryColumn()
    lanhoc: number;

    @Column({ nullable: false })
    diemktmon: number;

    @Column({ nullable: false })
    diemthi: number;

    @Column({ nullable: false })
    diemthanhphan: number;

    @ManyToOne(() => SinhvienKi, (svk) => svk.svhp)
    @JoinColumn([
        { name: 'masv', referencedColumnName: 'masv' },
        // { name: 'kithu', referencedColumnName: 'kithu' }
    ])
    svk: SinhvienKi;

    @ManyToOne(() => Hocphan, (hp) => hp.svhp)
    @JoinColumn([
        { name: 'mahocphan', referencedColumnName: 'mahocphan' },
        // { name: 'thutu', referencedColumnName: 'thutu' }
    ])
    hp: Hocphan;
}
