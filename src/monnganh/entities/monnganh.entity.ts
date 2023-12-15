import { Mon } from "src/mon/entities/mon.entity";
import { Nganh } from "src/nganh/entities/nganh.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Monnganh {
    @PrimaryGeneratedColumn()
    mamonnganh: number;

    @Column({ nullable: false })
    hockithu: number;

    @ManyToOne(() => Nganh, (nganh) => nganh.monnganh)
    @JoinColumn({ name: 'manganh' }) // Định nghĩa tên cột trong database cho mối quan hệ
    nganh: Nganh;

    @ManyToOne(() => Mon, (mon) => mon.monnganh)
    @JoinColumn({ name: 'mamon' }) // Định nghĩa tên cột trong database cho mối quan hệ
    mon: Mon;
}
