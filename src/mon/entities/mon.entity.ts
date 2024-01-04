import { Hocphan } from "src/hocphan/entities/hocphan.entity";
import { Monnganh } from "src/monnganh/entities/monnganh.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mon {
    @PrimaryColumn()
    mamonhoc: string;

    @Column({ nullable: false })
    tenmonhoc: string;

    @Column({ nullable: false })
    sotc: number;

    @Column({ nullable: false })
    mota: string;

    @OneToMany(() => Monnganh, (monnganh) => monnganh.nganh)
    monnganh: Monnganh[];

    @OneToMany(() => Hocphan, (hocphan) => hocphan.mon)
    hocphans: Monnganh[];
}
